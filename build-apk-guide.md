# Guía para Convertir PWA a APK

## 🚀 Método 1: PWA Builder (Recomendado)

### Paso 1: Preparar tu PWA
1. Asegúrate de que tu PWA funciona correctamente
2. Verifica que el `manifest.json` esté completo
3. Confirma que el Service Worker funciona

### Paso 2: Usar PWA Builder
1. Ve a: https://www.pwabuilder.com/
2. Introduce la URL de tu PWA (o localhost si estás en desarrollo)
3. Haz clic en "Start" para analizar tu PWA
4. Selecciona "Android" en las opciones de plataforma
5. Configura los ajustes del APK:
   - Nombre de la app
   - Icono
   - Configuraciones adicionales
6. Descarga el APK generado

### Ventajas:
- ✅ Proceso automático
- ✅ APK optimizado
- ✅ Soporte oficial de Microsoft
- ✅ Fácil de usar

## 🛠️ Método 2: Capacitor (Ionic)

### Instalación:
```bash
npm install -g @capacitor/cli
npm install @capacitor/core @capacitor/android
```

### Configuración:
```bash
# Inicializar Capacitor
npx cap init "Calculadora Alcalinidad" "com.fontaneria.gavilan.alcalinidad"

# Agregar plataforma Android
npx cap add android

# Copiar archivos web
npx cap copy

# Abrir en Android Studio
npx cap open android
```

### En Android Studio:
1. Conecta tu dispositivo Android o usa un emulador
2. Haz clic en "Run" para generar el APK
3. El APK se generará en `android/app/build/outputs/apk/`

## 📱 Método 3: Cordova

### Instalación:
```bash
npm install -g cordova
```

### Configuración:
```bash
# Crear proyecto Cordova
cordova create alcalinidad-app com.fontaneria.gavilan.alcalinidad "Calculadora Alcalinidad"
cd alcalinidad-app

# Copiar tus archivos web a www/
# Reemplaza el contenido de www/ con tus archivos

# Agregar plataforma Android
cordova platform add android

# Construir APK
cordova build android
```

## 🔧 Método 4: Android Studio (Manual)

### Crear WebView App:
1. Abre Android Studio
2. Crea nuevo proyecto "Empty Activity"
3. Modifica `MainActivity.java` para cargar tu PWA:

```java
WebView webView = findViewById(R.id.webview);
webView.getSettings().setJavaScriptEnabled(true);
webView.loadUrl("file:///android_asset/index.html");
```

4. Copia tus archivos web a `assets/`
5. Compila el APK

## 📦 Para Distribución Local

### Opción A: Archivo APK directo
- Genera el APK con cualquier método anterior
- Comparte el archivo `.apk` por:
  - WhatsApp
  - Email
  - USB
  - Bluetooth
  - Google Drive/Dropbox

### Opción B: Servidor local
```bash
# Crear servidor simple con Python
python -m http.server 8000

# O con Node.js
npx http-server
```

Luego comparte la IP local: `http://192.168.1.X:8000`

## 🎯 Configuración Recomendada para tu App

### manifest.json optimizado:
```json
{
  "name": "Calculadora de Alcalinidad",
  "short_name": "Alcalinidad",
  "start_url": "/",
  "display": "standalone",
  "orientation": "portrait",
  "theme_color": "#7c3aed",
  "background_color": "#f8fafc",
  "icons": [
    {
      "src": "icon-192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "icon-512.png", 
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any maskable"
    }
  ]
}
```

## 🚀 Pasos Rápidos (PWA Builder):

1. **Sube tu PWA** a un servidor web (GitHub Pages, Netlify, etc.)
2. **Ve a pwabuilder.com**
3. **Introduce la URL** de tu PWA
4. **Descarga el APK** generado
5. **Comparte el APK** por WhatsApp/Email

## 📋 Checklist antes de generar APK:

- [ ] PWA funciona correctamente
- [ ] Manifest.json completo
- [ ] Service Worker registrado
- [ ] Iconos en tamaños correctos (192x192, 512x512)
- [ ] Probado en dispositivos móviles
- [ ] Funcionalidad offline verificada

## 🎯 Recomendación Final:

Para tu caso específico, te recomiendo **PWA Builder** porque:
- Es más simple
- No requiere conocimientos de Android
- Genera APKs optimizados
- Es gratuito
- Mantiene todas las funcionalidades PWA