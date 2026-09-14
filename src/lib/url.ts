/**
 * Antepone el `base` de Astro (import.meta.env.BASE_URL) a rutas internas que empiezan con "/".
 * Necesario para poder desplegar el mismo build tanto en la raíz del dominio como en una
 * subcarpeta (p. ej. /prueba) sin que se rompan imágenes, CSS/JS o enlaces del menú.
 * Deja intactas las URLs absolutas (http/https), protocolos especiales (mailto:, tel:) y anclas (#).
 */
export const withBase = (path: string): string => {
  if (!path || /^([a-z]+:)?\/\//i.test(path) || /^(mailto:|tel:|data:|#)/i.test(path)) return path;
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return path.startsWith('/') ? `${base}${path}` : `${base}/${path}`;
};
