// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// Sitio estático: se sube la carpeta dist/ al hosting cPanel (Benzahosting).
// BASE_PATH permite generar un build para una subcarpeta (p. ej. /prueba) sin
// afectar el build normal de producción, que se sirve desde la raíz del dominio.
const base = process.env.BASE_PATH || '/';

export default defineConfig({
  site: 'https://vortec-consulting.com',
  base,
  output: 'static',
  trailingSlash: 'never',
  // "directory": cada página genera carpeta/index.html (p. ej. consultorias/index.html),
  // evitando el choque entre el archivo "consultorias.html" y la carpeta "consultorias/"
  // (con las fichas de cada servicio) que causaba 403 / bucles de redirección en Apache.
  build: { format: 'directory' },
  integrations: [
    sitemap({
      // /gracias es noindex (confirmación de formulario): no debe aparecer en el sitemap.
      filter: (page) => !page.endsWith('/gracias'),
    }),
  ],
  vite: { plugins: [tailwindcss()] },
});
