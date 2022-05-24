# Lector de Noticias RSS - Optimización Servidor

## Integrantes

| Jesús Miguel Álvarez Vázquez            | William Cetina Pech                        | Pedro Daniel Euan Chan                     | Mario Angel May Rodriguez                  | Lorenzo José de Jesús Lliteras Narváez      |
| ------------------------------------------ | ------------------------------------------ | ------------------------------------------ | ------------------------------------------ | ---------------------------------------------- |
| ![Jesus](https://i.ibb.co/3TQ7XtP/Jesus.jpg) | ![Willy](https://i.ibb.co/xqqpgGS/Willy.jpg) | ![Pedro](https://i.ibb.co/x65hvnb/Pedro.jpg) | ![Mario](https://i.ibb.co/k5cwtgm/Mario.jpg) | ![Lorenzo](https://i.ibb.co/zSsQBGQ/Lorenzo.jpg) |

# Flujo de Trabajo

Para delimitar nuestro flujo de trabajo, hemos creado ramas para ubicar el código fuente de las versiones del Lector RSS conforme avance el desarrollo, las ramas importantes son:

1. RSS-NoOptimizado
2. OptimizacionCliente
3. OptimizacionServidor

# Configuración del Servidor Apache

En esta rama se optimizó el lado del servidor configurando un par de archivos del servidor Apache. Importante mencionar que hay que reiniciar el servidor al terminar de modificar los archivos para ver reflejada la optimización.

### httpd.conf

Activar las siguientes lineas:

```
LoadModule deflate_module modules/mod_deflate.so
LoadModule filter_module modules/mod_filter.so
LoadModule expires_module modules/mod_expires.so
```

Después, añadir las siguientes lineas al archivo:

```
<IfModule mod_expires.c>
ExpiresActive On
ExpiresDefault "access plus 4 weeks"
</IfModule>

<IfModule mod_deflate.c>
AddOutputFilterByType DEFLATE text/plain
AddOutputFilterByType DEFLATE text/html
AddOutputFilterByType DEFLATE text/xml
AddOutputFilterByType DEFLATE text/css
AddOutputFilterByType DEFLATE application/xml
AddOutputFilterByType DEFLATE application/xhtml+xml
AddOutputFilterByType DEFLATE application/rss+xml
AddOutputFilterByType DEFLATE application/javascript
AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>
```

### php.ini

Activamos la compresión Gzip agregando las siguientes líneas en el archivo:

```
zlib.output_compression = On
zlib.output_compression_level = 9
allow_url_fopen = On
```

# Ejecución e Instalación

1. Clonar el repositorio.
2. Abrir el proyecto con un IDE y ubicarse en la rama a probar.
3. Importar la base de datos de la carpeta "database".
4. Mover la carpeta del proyecto a la siguiente ruta C:\xampp\htdocs (si se utiliza Xampp, si no, mover la carpeta al directorio del servidor que utilice).
5. Inicializar el servidor.
6. Abrir el archivo "index.html" con el navegador.
