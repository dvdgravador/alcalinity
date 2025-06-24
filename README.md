# Calculadora de Alcalinidad PWA

Una aplicación web progresiva (PWA) para calcular la alcalinidad de piscinas y determinar la cantidad necesaria de ALKA+ (bicarbonato) para mantener los niveles óptimos.

## Características

- ✅ **PWA Completa**: Instalable en dispositivos móviles y de escritorio
- 📱 **Responsive**: Funciona perfectamente en todos los tamaños de pantalla
- 🔄 **Offline**: Funciona sin conexión a internet una vez instalada
- 🎨 **Diseño Moderno**: Interfaz limpia y profesional
- 📊 **Cálculos Precisos**: Fórmulas exactas para determinar alcalinidad y dosis

## Funcionalidades

### Calculadora Principal
- Entrada de cantidad de pastillas utilizadas en el test
- Selección del volumen de muestra (50ml o 100ml)
- Entrada del volumen de la piscina en metros cúbicos
- Cálculo automático de la alcalinidad actual
- Recomendación de dosis de ALKA+ necesaria

### Información Educativa
- Explicación sobre qué es la alcalinidad
- Valores ideales y recomendados
- Información sobre el producto CTX ALKA+
- Instrucciones de uso

## Instalación

### Como PWA (Recomendado)
1. Abre la aplicación en tu navegador
2. Busca el banner de instalación o el botón "Instalar"
3. Sigue las instrucciones para instalar en tu dispositivo
4. ¡Listo! Ahora puedes usar la app como una aplicación nativa

### Desarrollo Local
```bash
# Clona el repositorio
git clone [url-del-repositorio]

# Navega al directorio
cd calculadora-alcalinidad

# Instala las dependencias
npm install

# Inicia el servidor de desarrollo
npm run dev
```

## Uso

1. **Ingresa los datos del test**:
   - Número de pastillas utilizadas
   - Volumen de la muestra (50ml o 100ml)
   - Volumen total de la piscina en m³

2. **Presiona "Calcular"** para obtener:
   - Alcalinidad actual de la piscina
   - Diferencia con el valor objetivo (125 ppm)
   - Cantidad exacta de ALKA+ necesaria

3. **Aplica el tratamiento** según la recomendación

## Fórmulas Utilizadas

### Cálculo de Alcalinidad
- **Muestra 50ml**: `Alcalinidad = (Pastillas × 40) - 20`
- **Muestra 100ml**: `Alcalinidad = (Pastillas × 20) - 10`

### Cálculo de ALKA+
- **Fórmula**: `Kilos = (Diferencia_ppm × Volumen_m³ × 1.8) / 1000`
- **Base**: 1.8 kg de ALKA+ aumenta 10 ppm en 100 m³

## Valores de Referencia

- **Alcalinidad Recomendada**: 80-120 ppm
- **Alcalinidad Óptima**: 125 ppm
- **Tiempo de Espera**: 4-6 horas antes de volver a medir

## Tecnologías

- **HTML5**: Estructura semántica
- **CSS3**: Diseño responsive y moderno
- **JavaScript ES6+**: Lógica de la aplicación
- **PWA**: Service Worker para funcionalidad offline
- **Web App Manifest**: Configuración de instalación

## Compatibilidad

- ✅ Chrome/Chromium (Android, iOS, Desktop)
- ✅ Safari (iOS, macOS)
- ✅ Firefox (Android, Desktop)
- ✅ Edge (Windows, Android)

## Créditos

**Desarrollado por**: David Carrillo Tirado  
**Para**: Fontanería Gavilán  
**Propósito**: Herramienta profesional para mantenimiento de piscinas

## Licencia

Este proyecto está desarrollado específicamente para Fontanería Gavilán como herramienta de trabajo profesional.

---

*Para soporte técnico o consultas, contacta con el desarrollador.*