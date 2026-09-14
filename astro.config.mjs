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
  build: { format: 'file' },
  integrations: [sitemap()],
  vite: { plugins: [tailwindcss()] },
});
