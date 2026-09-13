import type { Contacto } from '@/lib/types';

/**
 * Datos de contacto estáticos (fallback).
 * Cuando WordPress esté configurado, estos datos se reemplazan por los que
 * entrega el endpoint /wp-json/vortec/v1/contacto (ver wordpress/vortec-headless.php).
 */
export const contactoEstatico: Contacto = {
  empresa: 'Vortec Consulting',
  tagline: 'Consultores y Capacitación',
  telefono: '+56 9 7668 4877',
  whatsapp: '56976684877',
  email: 'contacto@vortec-consulting.com',
  direccion: 'Av. Canal de la Luz 3696',
  comuna: 'Puente Alto',
  ciudad: 'Santiago, Región Metropolitana',
  horario: 'Lunes a viernes, 9:00 a 18:00 hrs',
  mapaEmbed:
    'https://www.google.com/maps?q=Av.+Canal+de+la+Luz+3696,+Puente+Alto,+Chile&output=embed',
};
