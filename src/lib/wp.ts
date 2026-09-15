/**
 * Capa de datos: WordPress headless con fallback a datos estáticos.
 *
 * - Servicios:  GET {WP_URL}/wp-json/wp/v2/servicios?per_page=100&_embed
 *               (CPT "servicio" registrado por wordpress/vortec-headless.php)
 * - Contacto:   GET {WP_URL}/wp-json/vortec/v1/contacto
 *
 * Si WP_URL no está definida, no responde, o no tiene servicios publicados,
 * se usan los datos de src/data/. Todo se resuelve en build (sitio estático).
 */
import type { Contacto, Modulo, Servicio, Categoria } from './types';
import { serviciosEstaticos } from '@/data/servicios';
import { contactoEstatico } from '@/data/contacto';
import { withBase } from './url';

const WP_URL = (import.meta.env.WP_URL ?? '').replace(/\/$/, '');
const TIMEOUT_MS = 8000;

async function wpFetch<T>(path: string): Promise<T | null> {
  if (!WP_URL) return null;
  try {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
    // Cache-buster: el hosting (nginx) puede servir respuestas brotli cacheadas de la REST API.
    const sep = path.includes('?') ? '&' : '?';
    const res = await fetch(`${WP_URL}/wp-json${path}${sep}_=${Date.now()}`, { signal: ctrl.signal, headers: { 'Cache-Control': 'no-cache' } });
    clearTimeout(t);
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

/** Convierte el campo de texto "temario" de WP a módulos.
 *  Formato:  Título del módulo
 *            - item
 *            - item
 *            (línea en blanco separa módulos)
 */
export function parseTemario(texto: string | undefined): Modulo[] {
  if (!texto) return [];
  return texto
    .replace(/\r/g, '')
    .split(/\n\s*\n/)
    .map((bloque) => {
      const lineas = bloque.split('\n').map((l) => l.trim()).filter(Boolean);
      if (!lineas.length) return null;
      const esItem = (l: string) => /^[-•*]\s*/.test(l);
      const titulo = esItem(lineas[0]) ? '' : lineas[0];
      const items = lineas.filter((l, i) => i > 0 || esItem(l)).map((l) => l.replace(/^[-•*]\s*/, ''));
      return { titulo, items };
    })
    .filter((m): m is Modulo => !!m && m.items.length > 0);
}

function decode(html: string): string {
  return html
    .replace(/&#8211;/g, '–').replace(/&#8217;/g, '’').replace(/&#8220;/g, '“').replace(/&#8221;/g, '”')
    .replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#039;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/<[^>]+>/g, '').trim();
}

interface WpServicio {
  slug: string;
  menu_order: number;
  title: { rendered: string };
  content: { rendered: string };
  excerpt?: { rendered: string };
  meta?: { categoria?: string; resumen?: string; dirigido_a?: string; temario?: string; imagen_url?: string };
  _embedded?: { 'wp:featuredmedia'?: Array<{ source_url?: string }> };
}

function mapServicio(s: WpServicio): Servicio {
  const cat: Categoria = s.meta?.categoria === 'capacitacion' ? 'capacitacion' : 'consultoria';
  // Las fotos las controla el proyecto (src/data/servicios.ts) por slug; la destacada de WP es solo respaldo.
  const imagenLocal = serviciosEstaticos.find((e) => e.slug === s.slug)?.imagen;
  const imagenWp = imagenLocal || s._embedded?.['wp:featuredmedia']?.[0]?.source_url || s.meta?.imagen_url;
  return {
    slug: s.slug,
    titulo: decode(s.title.rendered),
    categoria: cat,
    resumen: s.meta?.resumen?.trim() || decode(s.excerpt?.rendered ?? ''),
    descripcion: s.content.rendered,
    dirigidoA: s.meta?.dirigido_a?.trim() || undefined,
    temario: parseTemario(s.meta?.temario),
    imagen: imagenWp || (cat === 'capacitacion' ? '/images/capacitaciones.webp' : '/images/consultorias.webp'),
    orden: s.menu_order ?? 0,
  };
}

let cacheServicios: Servicio[] | null = null;
let cacheContacto: Contacto | null = null;

export async function getServicios(): Promise<Servicio[]> {
  if (cacheServicios) return cacheServicios;
  const data = await wpFetch<WpServicio[]>('/wp/v2/servicios?per_page=100&_embed&orderby=menu_order&order=asc&status=publish');
  const lista = data && data.length ? data.map(mapServicio) : serviciosEstaticos;
  cacheServicios = [...lista].sort((a, b) => a.orden - b.orden);
  return cacheServicios;
}

export async function getServicio(slug: string): Promise<Servicio | undefined> {
  return (await getServicios()).find((s) => s.slug === slug);
}

export async function getServiciosPorCategoria(cat: Categoria): Promise<Servicio[]> {
  return (await getServicios()).filter((s) => s.categoria === cat);
}

export async function getContacto(): Promise<Contacto> {
  if (cacheContacto) return cacheContacto;
  const data = await wpFetch<Partial<Contacto>>('/vortec/v1/contacto');
  const limpio = data ? Object.fromEntries(Object.entries(data).filter(([, v]) => typeof v === 'string' && v.trim() !== '')) : {};
  cacheContacto = { ...contactoEstatico, ...limpio } as Contacto;
  if (!cacheContacto.whatsapp) cacheContacto.whatsapp = cacheContacto.telefono.replace(/\D/g, '');
  return cacheContacto;
}

export function fuenteDeDatos(): 'wordpress' | 'estatico' {
  return WP_URL ? 'wordpress' : 'estatico';
}

/** Ruta pública de una categoría y de un servicio. */
export function rutaCategoria(cat: Categoria): string {
  return withBase(cat === 'consultoria' ? '/consultorias' : '/capacitaciones');
}
export function rutaServicio(s: Servicio): string {
  return `${rutaCategoria(s.categoria)}/${s.slug}`;
}
