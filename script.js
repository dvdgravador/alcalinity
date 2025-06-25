class AlkalinityCalculator {
    constructor() {
        this.sampleVolume = 50;
        this.currentTab = 'calculator';
        this.initializeElements();
        this.bindEvents();
        this.initializeLucideIcons();
        this.initializeServiceWorker();
        this.setupInstallPrompt();
    }

    initializeElements() {
        this.tabletsInput = document.getElementById('tablets');
        this.poolVolumeInput = document.getElementById('pool-volume');
        this.calculateBtn = document.getElementById('calculate-btn');
        this.resetBtn = document.getElementById('reset-btn');
        this.resultsSection = document.getElementById('results-section');
        this.sampleButtons = document.querySelectorAll('.sample-button');
        
        // Tab elements
        this.tabButtons = document.querySelectorAll('.tab-button');
        this.tabContents = document.querySelectorAll('.tab-content');
        
        // Result elements
        this.calculatedAlkalinity = document.getElementById('calculated-alkalinity');
        this.targetAlkalinity = document.getElementById('target-alkalinity');
        this.difference = document.getElementById('difference');
        this.recommendation = document.getElementById('recommendation');
        this.perfectNote = document.getElementById('perfect-note');
        
        // Error elements
        this.tabletsError = document.getElementById('tablets-error');
        this.poolVolumeError = document.getElementById('pool-volume-error');
        
        // Install banner
        this.installBanner = document.getElementById('install-banner');
        this.installBtn = document.getElementById('install-btn');
        this.dismissBtn = document.getElementById('dismiss-btn');
    }

    bindEvents() {
        this.calculateBtn.addEventListener('click', () => this.handleCalculate());
        this.resetBtn.addEventListener('click', () => this.handleReset());
        
        this.sampleButtons.forEach(button => {
            button.addEventListener('click', (e) => this.handleSampleVolumeChange(e));
        });

        // Tab events
        this.tabButtons.forEach(button => {
            button.addEventListener('click', (e) => this.handleTabChange(e));
        });

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
        
        // Install banner events
        if (this.installBtn) {
            this.installBtn.addEventListener('click', () => this.handleInstall());
        }
        
        if (this.dismissBtn) {
            this.dismissBtn.addEventListener('click', () => this.dismissInstallBanner());
        }
    }
    
    initializeServiceWorker() {
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js')
                    .then(registration => {
                        console.log('Service Worker registrado con éxito:', registration.scope);
                    })
                    .catch(error => {
                        console.log('Error al registrar el Service Worker:', error);
                    });
            });
        }
    }
    
    setupInstallPrompt() {
        let deferredPrompt;
        
        window.addEventListener('beforeinstallprompt', (e) => {
            // Prevenir que Chrome muestre la instalación automáticamente
            e.preventDefault();
            // Guardar el evento para usarlo después
            deferredPrompt = e;
            // Mostrar el banner de instalación
            if (this.installBanner) {
                this.installBanner.style.display = 'block';
            }
        });
        
        // Función para manejar la instalación
        this.handleInstall = () => {
            if (!deferredPrompt) return;
            
            // Mostrar el prompt de instalación
            deferredPrompt.prompt();
            
            // Esperar a que el usuario responda
            deferredPrompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('Usuario aceptó la instalación');
                    this.dismissInstallBanner();
                } else {
                    console.log('Usuario rechazó la instalación');
                }
                // Limpiar el prompt guardado
                deferredPrompt = null;
            });
        };
        
        // Ocultar el banner si la app ya está instalada
        window.addEventListener('appinstalled', (e) => {
            this.dismissInstallBanner();
            console.log('Aplicación instalada');
        });
    }
    
    dismissInstallBanner() {
        if (this.installBanner) {
            this.installBanner.style.display = 'none';
        }
    }

    handleTabChange(event) {
        const targetTab = event.currentTarget.dataset.tab;
        
        // Update tab buttons
        this.tabButtons.forEach(btn => btn.classList.remove('active'));
        event.currentTarget.classList.add('active');
        
        // Update tab contents
        this.tabContents.forEach(content => content.classList.remove('active'));
        document.getElementById(`${targetTab}-tab`).classList.add('active');
        
        this.currentTab = targetTab;
        
        // Re-initialize icons after tab change
        setTimeout(() => {
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }
        }, 100);
    }

    initializeLucideIcons() {
        // Initialize Lucide icons after DOM is loaded
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
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