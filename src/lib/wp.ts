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
import type { Contacto, Modulo, Servicio, Categoria, Noticia, SeoYoast } from './types';
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
    .replace(/&hellip;/g, '…').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#039;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/<[^>]+>/g, '').trim();
}

/** Campo que agrega Yoast SEO a la REST API de WP (si el plugin está activo) en cualquier
 *  post type con show_in_rest, incluido el CPT "servicio" y las entradas ("Noticias"). */
interface WpYoastHeadJson {
  title?: string;
  description?: string;
  canonical?: string;
  og_image?: Array<{ url?: string }>;
  schema?: unknown;
}

function mapYoast(y: WpYoastHeadJson | undefined): SeoYoast | undefined {
  if (!y) return undefined;
  return {
    title: y.title,
    description: y.description,
    canonical: y.canonical,
    ogImage: y.og_image?.[0]?.url,
    schema: y.schema,
  };
}

interface WpServicio {
  slug: string;
  menu_order: number;
  title: { rendered: string };
  content: { rendered: string };
  excerpt?: { rendered: string };
  meta?: { categoria?: string; resumen?: string; dirigido_a?: string; temario?: string; imagen_url?: string };
  _embedded?: { 'wp:featuredmedia'?: Array<{ source_url?: string }> };
  yoast_head_json?: WpYoastHeadJson;
}

function mapServicio(s: WpServicio): Servicio {
  const cat: Categoria = s.meta?.categoria === 'capacitacion' ? 'capacitacion' : 'consultoria';
  // Igual que noticias: manda la imagen destacada de WP. Respaldo: campo imagen_url y luego la foto local por slug.
  const imagenLocal = serviciosEstaticos.find((e) => e.slug === s.slug)?.imagen;
  const imagenWp = s._embedded?.['wp:featuredmedia']?.[0]?.source_url || s.meta?.imagen_url?.trim() || imagenLocal;
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
    seo: mapYoast(s.yoast_head_json),
  };
}

let cacheServicios: Servicio[] | null = null;
let cacheContacto: Contacto | null = null;

// Servicios dados de baja por el cliente: se ocultan aunque sigan publicados en WordPress.
const SLUGS_EXCLUIDOS = ['auditoria-a-proveedores'];

export async function getServicios(): Promise<Servicio[]> {
  if (cacheServicios) return cacheServicios;
  const data = await wpFetch<WpServicio[]>('/wp/v2/servicios?per_page=100&_embed&orderby=menu_order&order=asc&status=publish');
  const lista = data && data.length ? data.map(mapServicio) : serviciosEstaticos;
  cacheServicios = [...lista].filter((s) => !SLUGS_EXCLUIDOS.includes(s.slug)).sort((a, b) => a.orden - b.orden);
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

/* ───────────────────────── Noticias (entradas de WP) ───────────────────────── */
interface WpPost {
  slug: string;
  date: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  _embedded?: { 'wp:featuredmedia'?: Array<{ source_url?: string }> };
  yoast_head_json?: WpYoastHeadJson;
}

function mapNoticia(p: WpPost): Noticia {
  const extracto = decode(p.excerpt?.rendered ?? '').replace(/\s*\[…\]\s*$/, '…').trim();
  return {
    slug: p.slug,
    titulo: decode(p.title.rendered),
    fecha: p.date.slice(0, 10),
    resumen: extracto,
    contenido: p.content.rendered,
    imagen: p._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/images/hero-consultoria.webp',
    seo: mapYoast(p.yoast_head_json),
  };
}

let cacheNoticias: Noticia[] | null = null;

/** Entradas publicadas de WordPress ("Noticias" en wp-admin), de la más reciente a la más antigua. */
export async function getNoticias(): Promise<Noticia[]> {
  if (cacheNoticias) return cacheNoticias;
  const data = await wpFetch<WpPost[]>('/wp/v2/posts?per_page=50&_embed&status=publish&orderby=date&order=desc');
  cacheNoticias = (data ?? []).map(mapNoticia);
  return cacheNoticias;
}

export function rutaNoticia(n: Noticia): string {
  return withBase(`/noticias/${n.slug}`);
}

export function fechaLarga(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString('es-CL', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
}
