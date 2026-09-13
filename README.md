# vortec-consulting.com — Astro + WordPress headless

Sitio estático en **Astro 7 + Tailwind CSS 4**. Los **servicios** y los **datos de contacto** se
administran desde WordPress (`https://vortec-consulting.com/admin/`); mientras WordPress no esté
configurado, el sitio usa los datos estáticos de `src/data/`.

## Comandos

```bash
npm install        # primera vez
npm run dev        # http://localhost:4321
npm run build      # genera dist/ (subir su contenido a public_html del cPanel)
npm run preview    # previsualiza dist/
```

## Estructura

```
src/
  data/servicios.ts      # servicios estáticos (fallback)
  data/contacto.ts       # datos de contacto estáticos (fallback)
  data/clientes.ts       # clientes destacados (home)
  lib/wp.ts              # capa de datos: WordPress → fallback estático
  lib/types.ts
  layouts/Base.astro     # <head>, SEO, schema.org, header/footer
  components/            # HeroSlider (3 slides), Header, Footer, ServiceCard, ContactForm, WhatsAppButton,
                         # ListadoCategoria (listado por categoría), ServicioDetalle (ficha)
  pages/
    index.astro          # home
    consultorias/index.astro     # /consultorias  (categoría "consultoria")
    consultorias/[slug].astro
    capacitaciones/index.astro   # /capacitaciones (categoría "capacitacion")
    capacitaciones/[slug].astro
    contacto.astro
    gracias.astro        # confirmación del formulario
    404.astro
public/
  images/*.webp          # imágenes de relleno (Freepik, licencia free) — reemplazar por fotos del cliente
  logo.svg, logo-blanco.svg, favicon.svg
  enviar.php             # envío del formulario por mail() (funciona en cPanel)
  .htaccess              # HTTPS, rutas sin .html, caché, 404
wordpress/
  vortec-headless.php    # plugin WP: CPT "Servicios" + "Datos de contacto" + importador + endpoint REST
  seed.json              # contenido inicial que importa el plugin
  vortec-headless.zip    # listo para subir en Plugins → Añadir nuevo
```

## Conectar con WordPress

1. En wp-admin → Plugins → Añadir nuevo → Subir plugin → `wordpress/vortec-headless.zip` → Activar.
   (El zip contiene `vortec-headless.php` y `seed.json`.)
2. En WP aparecen los menús **Servicios** y **Datos de contacto**. En *Datos de contacto → Importar contenido inicial*
   se cargan de una vez los 12 servicios y los datos de contacto (mismo contenido de `src/data/`).
   - Cada servicio: título, contenido (descripción larga), extracto, imagen destacada, y el meta box
     con *Categoría* (consultoría / capacitación), *Resumen*, *Dirigido a*, *Temario* y *Orden*
     (en "Atributos de página").
   - Formato del temario: título del módulo en una línea, ítems con `- `, módulos separados por línea en blanco.
3. Crear `.env` con `WP_URL=https://vortec-consulting.com/admin` (ver `.env.example`).
4. `npm run build`. Si WP responde y tiene servicios publicados, se usan esos; si no, los estáticos.

Endpoints usados: `GET /wp-json/wp/v2/servicios?per_page=100&_embed` y `GET /wp-json/vortec/v1/contacto`.

### Regeneración automática (opcional)
Definir en `wp-config.php`:
```php
define('VORTEC_DEPLOY_HOOK', 'https://api.github.com/repos/USUARIO/REPO/dispatches');
define('VORTEC_DEPLOY_TOKEN', 'ghp_...');
```
Al guardar un servicio o los datos de contacto, WP dispara un `repository_dispatch` (`event_type: wordpress-update`)
para que GitHub Actions haga build + FTP al cPanel (mismo esquema que ramsy.cl / elquicapital.cl).

## Despliegue en cPanel
- `.htaccess` incluye la regla para que `/admin` (WordPress) no sea reescrito.
- Subir todo el contenido de `dist/` a `public_html/` (WordPress vive en `public_html/admin/`).
- `enviar.php` usa `mail()`; el remitente es `web@vortec-consulting.com` (crear la cuenta o cambiarlo en el archivo).

## Pendientes de contenido
- Reemplazar imágenes de relleno por fotos reales del cliente.
- Confirmar textos de "Nosotros", cifras y horario de atención.
- Redes sociales: se muestran en el footer cuando se completan en WP (LinkedIn/Instagram/Facebook).
