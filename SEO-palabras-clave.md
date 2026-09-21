# vortec-consulting.com — Palabras clave SEO

Actualizado: 2026-09-21. Estas palabras ya están integradas en títulos, descripciones y meta keywords del sitio (build de Astro). Al subir `dist/` a la URL principal quedan activas; después: enviar `https://vortec-consulting.com/sitemap-index.xml` en Google Search Console y crear el perfil de Google Business Profile (Puente Alto, Santiago).

## Palabras clave principales (marca + servicio + país)
- consultoría para laboratorios Chile
- acreditación ISO 17025 / NCh-ISO/IEC 17025 laboratorios
- consultoría certificación ISO 9001 / ISO 14001 / ISO 22000 / ISO 45001
- capacitación técnica para laboratorios Chile
- cursos in-company laboratorio industria Santiago

## Consultorías
| Página | Palabras clave objetivo |
|---|---|
| /consultorias | consultoría industrial Chile, consultoría laboratorios, asesoría calidad laboratorios |
| 5S y Lean Manufacturing | implementación 5S Chile, consultoría Lean Manufacturing, mejora continua planta |
| Optimización de procesos industriales | optimización de procesos industriales, reducción de costos producción, análisis causa raíz |
| Consultoría para laboratorios | implementación ISO 17025, acreditación INN laboratorio, sistema de gestión laboratorio |
| Medio ambiente | consultoría ambiental Chile, RILES, residuos peligrosos DS 148, cumplimiento normativa ambiental |
| Evaluación de servicio de control de plagas | evaluación control de plagas planta alimentos, DS 157, autorización SEREMI Salud control de plagas, ISP plaguicidas |
| Evaluación de proveedores de MP, insumos y envases | evaluación de proveedores industria alimentaria, auditoría de proveedores, calificación de proveedores materias primas |

## Capacitaciones
| Página | Palabras clave objetivo |
|---|---|
| /capacitaciones | cursos técnicos laboratorio, capacitación analistas químicos, cursos calidad Chile |
| Certificaciones ISO, BAP, 17025, ASC y GLOBAL G.A.P. | curso ISO 17025, auditor interno ISO 9001, certificación BAP ASC GLOBAL G.A.P. Chile, RTRS |
| Validación de métodos e incertidumbre | validación de métodos analíticos, cálculo de incertidumbre de medición, curso validación ISO 17025 |
| Resolución de no conformidades | acciones correctivas no conformidades, análisis causa raíz laboratorio |
| Buenas prácticas de laboratorio (BPM y BPL) | curso BPL, buenas prácticas de laboratorio, BPM |
| HPLC | curso HPLC Chile, cromatografía líquida capacitación, troubleshooting HPLC |
| GC-FID / GC-MS | curso cromatografía gaseosa, GC-MS capacitación |
| ICP-OES / ICP-MS | curso ICP-OES, ICP-MS análisis de metales |
| Food Safety / Higiene y Seguridad | curso HACCP Chile, FSSC 22000, BRC, inocuidad alimentaria capacitación |
| Metrología física y química | curso metrología laboratorio, calibración de equipos, trazabilidad metrológica |
| Espectroscopía de Absorción Atómica | curso absorción atómica, EAA análisis de metales |
| Espectroscopía NIR / FTIR | curso NIR FTIR, espectroscopía infrarroja aplicada |

## Local / geográfico
- Puente Alto, Santiago, Región Metropolitana, Chile, LATAM
- Etiquetas `geo.region` CL-RM y `geo.placename` Santiago, Chile en todas las páginas; schema.org ProfessionalService con dirección.

## Dónde está cada cosa en el código
- `<title>` y `<meta description>`: `src/pages/index.astro`, `consultorias/index.astro`, `capacitaciones/index.astro`, `noticias/index.astro`, `contacto.astro`.
- Fichas de servicio: `src/components/ServicioDetalle.astro` arma el título como "Consultoría en X — Chile" o "Curso X — Capacitación en Chile"; la descripción sale del campo *resumen* de WordPress → **Jaime puede mejorar el SEO editando el resumen de cada servicio en WP**.
- `<meta keywords>` y geo: `src/layouts/Base.astro`.
- Sitemap y robots: `@astrojs/sitemap` + `public/robots.txt`.

## Pendientes SEO fuera del código
1. Google Search Console: verificar dominio y enviar sitemap.
2. Google Business Profile con la dirección de Puente Alto.
3. Publicar noticias con regularidad (1–2 al mes) usando estas palabras clave en título y primer párrafo.
4. Conseguir enlaces desde clientes/asociaciones (VIRUTEX, EDELPA, UPLA, AGQ, ETEX) y directorios de proveedores industriales.
