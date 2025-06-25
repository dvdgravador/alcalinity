# 🚀 Guía: De HTML a APK vía Netlify

## 📋 Paso 1: Preparar el archivo

Ya tienes todo listo en un solo archivo: `calculadora-alcalinidad-completa.html`

## 🌐 Paso 2: Subir a Netlify (2 minutos)

### Opción A: Arrastrar y soltar (MÁS FÁCIL)
1. **Ve a**: https://netlify.com
2. **Haz clic en "Deploy to Netlify"** (botón grande en el centro)
3. **Arrastra** tu archivo `calculadora-alcalinidad-completa.html` a la zona de drop
4. **Renómbralo** a `index.html` cuando te lo pida
5. **¡Listo!** Te dará una URL como: `https://amazing-name-123456.netlify.app`

### Opción B: Desde carpeta
1. Crea una carpeta nueva en tu ordenador
2. Copia `calculadora-alcalinidad-completa.html` dentro
3. Renómbralo a `index.html`
4. Arrastra toda la carpeta a Netlify

## 📱 Paso 3: Crear APK con PWA Builder (5 minutos)

1. **Ve a**: https://www.pwabuilder.com/
2. **Pega tu URL de Netlify** (ej: `https://amazing-name-123456.netlify.app`)
3. **Haz clic en "Start"**
4. **Espera el análisis** (1-2 minutos)
5. **Selecciona "Android"**
6. **Configura tu APK**:
   - **App Name**: `Calculadora Alcalinidad`
   - **Package ID**: `com.fontaneria.gavilan.alcalinidad`
   - **Version**: `1.0.0`
   - **Icono**: Puedes usar el que viene por defecto
7. **Haz clic en "Generate"**
8. **Descarga el APK** (archivo .apk)

## 📤 Paso 4: Compartir el APK

### Por WhatsApp/Telegram:
1. Abre WhatsApp o Telegram
2. Selecciona el contacto
3. Haz clic en 📎 (adjuntar)
4. Selecciona "Documento" o "Archivo"
5. Busca tu archivo `.apk` y envíalo

### Por Email:
1. Abre tu email
2. Adjunta el archivo `.apk`
3. Envía

## 📲 Paso 5: Instalar en Android

### Para quien recibe el APK:
1. **Descarga el archivo** `.apk` en el móvil
2. **Ve a Configuración** > Seguridad > **Activa "Fuentes desconocidas"**
3. **Abre el archivo** `.apk` desde Descargas
4. **Confirma la instalación**
5. **¡Listo!** La app aparecerá en el menú

## ⚡ Resumen súper rápido:

```
1. Netlify.com → Arrastra HTML → Copia URL
2. PWABuilder.com → Pega URL → Descarga APK  
3. WhatsApp → Adjunta APK → Envía
4. Android → Instala APK → ¡Funciona!
```

## 🎯 URLs importantes:

- **Netlify**: https://netlify.com
- **PWA Builder**: https://www.pwabuilder.com/

## ⚠️ Notas importantes:

- El archivo debe llamarse `index.html` en Netlify
- El APK funcionará offline una vez instalado
- No necesitas Google Play Store
- Funciona en cualquier Android 5.0+

## 🆘 Si algo falla:

1. **Netlify no funciona**: Asegúrate de que el archivo se llama `index.html`
2. **PWA Builder da error**: Espera 5 minutos y vuelve a intentar
3. **APK no instala**: Activa "Fuentes desconocidas" en Android
4. **App no funciona**: Verifica que la URL de Netlify funciona en el navegador

¡En 10 minutos tendrás tu APK listo para compartir! 🎉