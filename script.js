class AlkalinityCalculator {
    constructor() {
        this.sampleVolume = 50;
        this.deferredPrompt = null;
        this.initializeElements();
        this.bindEvents();
        this.initializeLucideIcons();
        this.initializePWA();
    }

    initializeElements() {
        this.tabletsInput = document.getElementById('tablets');
        this.poolVolumeInput = document.getElementById('pool-volume');
        this.calculateBtn = document.getElementById('calculate-btn');
        this.resetBtn = document.getElementById('reset-btn');
        this.resultsSection = document.getElementById('results-section');
        this.sampleButtons = document.querySelectorAll('.sample-button');
        
        // PWA elements
        this.installBanner = document.getElementById('install-banner');
        this.installBtn = document.getElementById('install-btn');
        this.dismissBtn = document.getElementById('dismiss-btn');
        
        // Result elements
        this.calculatedAlkalinity = document.getElementById('calculated-alkalinity');
        this.targetAlkalinity = document.getElementById('target-alkalinity');
        this.difference = document.getElementById('difference');
        this.recommendation = document.getElementById('recommendation');
        this.perfectNote = document.getElementById('perfect-note');
        
        // Error elements
        this.tabletsError = document.getElementById('tablets-error');
        this.poolVolumeError = document.getElementById('pool-volume-error');
    }

    bindEvents() {
        this.calculateBtn.addEventListener('click', () => this.handleCalculate());
        this.resetBtn.addEventListener('click', () => this.handleReset());
        
        this.sampleButtons.forEach(button => {
            button.addEventListener('click', (e) => this.handleSampleVolumeChange(e));
        });

        // PWA events
        if (this.installBtn) {
            this.installBtn.addEventListener('click', () => this.handleInstall());
        }
        if (this.dismissBtn) {
            this.dismissBtn.addEventListener('click', () => this.dismissInstallBanner());
        }

        // Clear errors on input
        this.tabletsInput.addEventListener('input', () => this.clearError('tablets'));
        this.poolVolumeInput.addEventListener('input', () => this.clearError('pool-volume'));

        // Enter key support
        this.tabletsInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.poolVolumeInput.focus();
        });
        
        this.poolVolumeInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.handleCalculate();
        });
    }

    initializeLucideIcons() {
        // Initialize Lucide icons after DOM is loaded
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }

    initializePWA() {
        // Register service worker
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js')
                .then((registration) => {
                    console.log('SW registered: ', registration);
                })
                .catch((registrationError) => {
                    console.log('SW registration failed: ', registrationError);
                });
        }

        // Listen for beforeinstallprompt event
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            this.deferredPrompt = e;
            this.showInstallBanner();
        });

        // Listen for appinstalled event
        window.addEventListener('appinstalled', () => {
            console.log('PWA was installed');
            this.dismissInstallBanner();
        });

        // Check if already installed
        if (window.matchMedia('(display-mode: standalone)').matches) {
            console.log('App is running in standalone mode');
        }
    }

    showInstallBanner() {
        if (this.installBanner && !localStorage.getItem('installBannerDismissed')) {
            this.installBanner.style.display = 'block';
            // Re-initialize icons for the banner
            setTimeout(() => {
                if (typeof lucide !== 'undefined') {
                    lucide.createIcons();
                }
            }, 100);
        }
    }

    dismissInstallBanner() {
        if (this.installBanner) {
            this.installBanner.style.display = 'none';
            localStorage.setItem('installBannerDismissed', 'true');
        }
    }

    async handleInstall() {
        if (this.deferredPrompt) {
            this.deferredPrompt.prompt();
            const { outcome } = await this.deferredPrompt.userChoice;
            console.log(`User response to the install prompt: ${outcome}`);
            this.deferredPrompt = null;
            this.dismissInstallBanner();
        }
    }

    handleSampleVolumeChange(event) {
        const volume = parseInt(event.target.dataset.volume);
        this.sampleVolume = volume;
        
        // Update button states
        this.sampleButtons.forEach(btn => btn.classList.remove('active'));
        event.target.classList.add('active');
    }

    calculateAlkalinity(tabletsCount, sampleMl) {
        if (sampleMl === 50) {
            return tabletsCount * 40 - 20;
        } else if (sampleMl === 100) {
            return tabletsCount * 20 - 10;
        } else {
            throw new Error('Debes elegir si tu muestra es 50ml o 100 ml');
        }
    }

    calculateAlkaPlusKilos(differencePpm, volumeM3) {
        // 1.8 kg of ALKA+ raises 10 ppm in 100 m³
        // Formula: kilos = (difference_ppm * volume_m3 * 1.8) / (10 * 100)
        return Math.round((differencePpm * volumeM3 * 1.8) / 1000 * 100) / 100;
    }

    validateInputs() {
        let isValid = true;
        
        // Clear previous errors
        this.clearAllErrors();

        const tablets = this.tabletsInput.value.trim();
        const poolVolume = this.poolVolumeInput.value.trim();

        if (!tablets || isNaN(Number(tablets)) || Number(tablets) < 0) {
            this.showError('tablets', 'Por favor, ingresa un número correcto de pastillas.');
            isValid = false;
        }

        if (!poolVolume || isNaN(Number(poolVolume)) || Number(poolVolume) <= 0) {
            this.showError('pool-volume', 'Ingresa los metros cúbicos del vaso de la piscina');
            isValid = false;
        }

        return isValid;
    }

    showError(field, message) {
        const input = document.getElementById(field);
        const errorContainer = document.getElementById(`${field}-error`);
        const errorText = errorContainer.querySelector('.error-text');
        
        input.classList.add('error');
        errorText.textContent = message;
        errorContainer.style.display = 'flex';
    }

    clearError(field) {
        const input = document.getElementById(field);
        const errorContainer = document.getElementById(`${field}-error`);
        
        input.classList.remove('error');
        errorContainer.style.display = 'none';
    }

    clearAllErrors() {
        this.clearError('tablets');
        this.clearError('pool-volume');
    }

    handleCalculate() {
        if (!this.validateInputs()) return;

        try {
            const tabletsCount = Number(this.tabletsInput.value);
            const volumeM3 = Number(this.poolVolumeInput.value);
            const alkalinity = this.calculateAlkalinity(tabletsCount, this.sampleVolume);
            const targetAlkalinity = 125; // ppm recommended
            const difference = Math.max(0, targetAlkalinity - alkalinity);
            const alkaPlusKilos = this.calculateAlkaPlusKilos(difference, volumeM3);

            this.displayResults({
                alkalinity,
                targetAlkalinity,
                difference,
                alkaPlusKilos
            });

        } catch (error) {
            alert('Algo ha fallado...:(');
        }
    }

    displayResults(result) {
        // Update result values
        this.calculatedAlkalinity.textContent = `${result.alkalinity} ppm`;
        this.targetAlkalinity.textContent = `${result.targetAlkalinity} ppm`;
        this.difference.textContent = `${result.difference} ppm`;
        this.recommendation.textContent = `${result.alkaPlusKilos} kg de ALKA+`;

        // Update difference color
        this.difference.classList.remove('warning', 'success');
        if (result.difference > 0) {
            this.difference.classList.add('warning');
        } else {
            this.difference.classList.add('success');
        }

        // Show/hide perfect note
        if (result.difference === 0) {
            this.perfectNote.style.display = 'block';
        } else {
            this.perfectNote.style.display = 'none';
        }

        // Show results section with animation
        this.resultsSection.style.display = 'block';
        this.resultsSection.classList.add('show');
        
        // Scroll to results
        this.resultsSection.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
        });
    }

    handleReset() {
        // Clear inputs
        this.tabletsInput.value = '';
        this.poolVolumeInput.value = '';
        
        // Reset sample volume to 50ml
        this.sampleVolume = 50;
        this.sampleButtons.forEach(btn => btn.classList.remove('active'));
        this.sampleButtons[0].classList.add('active'); // First button is 50ml
        
        // Hide results
        this.resultsSection.style.display = 'none';
        this.resultsSection.classList.remove('show');
        
        // Clear errors
        this.clearAllErrors();
        
        // Focus on first input
        this.tabletsInput.focus();
    }
}

// Initialize the calculator when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AlkalinityCalculator();
});