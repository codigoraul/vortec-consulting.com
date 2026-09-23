export type Categoria = 'consultoria' | 'capacitacion';

export interface Modulo {
  titulo: string;
  items: string[];
}

/** Datos SEO tomados de Yoast SEO (campo `yoast_head_json` de la REST API de WP), si el plugin está activo. */
export interface SeoYoast {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  /** Grafo de schema.org que genera Yoast (Organization, WebPage, BreadcrumbList, etc.). */
  schema?: unknown;
}

export interface Servicio {
  slug: string;
  titulo: string;
  categoria: Categoria;
  /** Resumen corto para tarjetas (1-2 líneas). */
  resumen: string;
  /** Descripción larga (HTML permitido) para la página del servicio. */
  descripcion: string;
  /** Público objetivo, p. ej. "Encargados de calidad, Jefes de laboratorio…". */
  dirigidoA?: string;
  /** Temario / módulos del curso o etapas de la consultoría. */
  temario: Modulo[];
  /** Ruta de imagen (public/ o URL absoluta de WordPress). */
  imagen: string;
  orden: number;
  /** Presente solo si Yoast SEO está activo en WordPress. */
  seo?: SeoYoast;
}

export interface Contacto {
  empresa: string;
  tagline: string;
  telefono: string;        // formato visible, p. ej. "+56 9 7668 4877"
  whatsapp: string;        // solo dígitos, p. ej. "56976684877"
  email: string;
  direccion: string;
  comuna: string;
  ciudad: string;
  horario: string;
  mapaEmbed?: string;      // URL de Google Maps embed
  linkedin?: string;
  instagram?: string;
  facebook?: string;
}

export interface Cliente {
  nombre: string;
  servicio: string;
}

export interface Noticia {
  slug: string;
  titulo: string;
  /** Fecha ISO (YYYY-MM-DD). */
  fecha: string;
  /** Extracto sin HTML para tarjetas y meta description. */
  resumen: string;
  /** Contenido HTML. */
  contenido: string;
  imagen: string;
  /** Presente solo si Yoast SEO está activo en WordPress. */
  seo?: SeoYoast;
}
