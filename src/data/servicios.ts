import type { Servicio } from '@/lib/types';

/**
 * Servicios estáticos (fallback). Contenido tomado de la presentación de la
 * empresa. Cuando WordPress esté configurado, este listado se reemplaza por el
 * CPT "servicio" (/wp-json/wp/v2/servicios).
 */
export const serviciosEstaticos: Servicio[] = [
  // ───────────────────────── CONSULTORÍAS ─────────────────────────
  {
    slug: '5s-y-lean-manufacturing',
    titulo: '5S y Lean Manufacturing',
    categoria: 'consultoria',
    resumen:
      'Implementación de la metodología 5S y herramientas Lean para ordenar, estandarizar y eliminar desperdicios en planta.',
    descripcion:
      '<p>Acompañamos a su organización en la implementación de <strong>5S</strong> (Clasificar, Ordenar, Limpiar, Estandarizar y Sostener) y de herramientas <strong>Lean Manufacturing</strong> orientadas a reducir tiempos, desperdicios y costos operativos, mejorando la seguridad y la productividad de sus procesos.</p><p>Trabajamos en terreno con sus equipos, definiendo indicadores y rutinas de seguimiento para que la mejora se mantenga en el tiempo.</p>',
    temario: [
      { titulo: 'Diagnóstico inicial', items: ['Levantamiento de procesos y áreas críticas', 'Definición de indicadores y línea base'] },
      { titulo: 'Implementación 5S', items: ['Clasificar y ordenar', 'Limpieza y estandarización', 'Disciplina y auditorías 5S'] },
      { titulo: 'Herramientas Lean', items: ['Mapeo de flujo de valor (VSM)', 'Kaizen y mejora continua', 'Gestión visual y Hoshin Kanri'] },
    ],
    imagen: '/images/consultorias.webp',
    orden: 1,
  },
  {
    slug: 'auditoria-a-proveedores',
    titulo: 'Auditoría a proveedores',
    categoria: 'consultoria',
    resumen:
      'Evaluación técnica y documental de proveedores para asegurar la calidad y la trazabilidad de su cadena de suministro.',
    descripcion:
      '<p>Realizamos <strong>auditorías de segunda parte</strong> a sus proveedores, evaluando sistemas de gestión, procesos productivos, controles de calidad y cumplimiento normativo. Entregamos un informe con hallazgos, riesgos y planes de acción priorizados.</p>',
    temario: [
      { titulo: 'Alcance', items: ['Definición de criterios y listas de verificación', 'Planificación y coordinación con el proveedor'] },
      { titulo: 'Ejecución', items: ['Auditoría documental y en terreno', 'Verificación de registros y trazabilidad'] },
      { titulo: 'Cierre', items: ['Informe de hallazgos y no conformidades', 'Seguimiento de acciones correctivas'] },
    ],
    imagen: '/images/hero-consultoria.webp',
    orden: 2,
  },
  {
    slug: 'optimizacion-de-procesos-industriales',
    titulo: 'Optimización de procesos industriales',
    categoria: 'consultoria',
    resumen:
      'Análisis y rediseño de procesos para aumentar la eficiencia, reducir costos y mejorar la calidad del producto.',
    descripcion:
      '<p>Analizamos sus procesos productivos con herramientas de <strong>ingeniería industrial y análisis de causa raíz</strong> para identificar cuellos de botella, variabilidad y pérdidas. Proponemos e implementamos mejoras medibles junto a su equipo.</p>',
    temario: [
      { titulo: 'Análisis', items: ['Diagramas de flujo y recogida de datos', 'Histogramas, Pareto y gráficos de control', 'Diagrama causa-efecto y los 5 ¿por qué?'] },
      { titulo: 'Mejora', items: ['Reingeniería de procesos', 'Estandarización y control', 'Indicadores de desempeño (KPI)'] },
    ],
    imagen: '/images/optimizacion-procesos.webp',
    orden: 3,
  },
  {
    slug: 'laboratorios',
    titulo: 'Consultoría para laboratorios',
    categoria: 'consultoria',
    resumen:
      'Implementación y mantención de sistemas de gestión de laboratorio: NCh-ISO 17025, BPL, validación y metrología.',
    descripcion:
      '<p>Apoyamos a laboratorios de ensayo y calibración en la <strong>implementación de NCh-ISO/IEC 17025</strong>, buenas prácticas de laboratorio, validación de métodos, cálculo de incertidumbre y aseguramiento metrológico, preparándolos para procesos de acreditación y auditorías.</p>',
    temario: [
      { titulo: 'Sistema de gestión', items: ['Diagnóstico frente a NCh-ISO/IEC 17025', 'Documentación y procedimientos', 'Formación de auditores internos'] },
      { titulo: 'Técnico', items: ['Validación de métodos analíticos', 'Estimación de incertidumbre', 'Trazabilidad y calibración de equipos'] },
    ],
    imagen: '/images/laboratorio.webp',
    orden: 4,
  },
  {
    slug: 'medio-ambiente',
    titulo: 'Medio ambiente',
    categoria: 'consultoria',
    resumen:
      'Asesoría en RILES, normativa ambiental aplicable y cumplimiento de requisitos legales para la industria.',
    descripcion:
      '<p>Asesoramos a empresas en el <strong>cumplimiento de la normativa ambiental</strong> vigente: residuos industriales líquidos (RILES), emisiones, residuos peligrosos y requisitos legales aplicables a su actividad, con planes de acción concretos.</p>',
    temario: [
      { titulo: 'Diagnóstico ambiental', items: ['Identificación de requisitos legales aplicables', 'Evaluación de cumplimiento'] },
      { titulo: 'Gestión', items: ['RILES y normativa asociada (DS 90, DS 46, DS 609)', 'Manejo de residuos peligrosos', 'Planes de mejora y seguimiento'] },
    ],
    imagen: '/images/medio-ambiente.webp',
    orden: 5,
  },

  // ───────────────────────── CAPACITACIONES ─────────────────────────
  {
    slug: 'certificaciones-iso-bap-17025-asc-global-gap',
    titulo: 'Certificaciones ISO, BAP, 17025, ASC y GLOBAL G.A.P.',
    categoria: 'capacitacion',
    resumen:
      'Interpretación de normas y formación de auditores internos para procesos de certificación y acreditación.',
    descripcion:
      '<p>Cursos de <strong>interpretación de normas</strong> y formación de auditores internos orientados a organizaciones que buscan certificarse o mantener su certificación en ISO 9001, ISO 14001, NCh-ISO/IEC 17025, BAP, ASC y GLOBAL G.A.P.</p>',
    dirigidoA: 'Encargados de calidad, jefes de área y responsables de sistemas de gestión.',
    temario: [
      { titulo: 'Contenidos', items: ['Estructura y requisitos de la norma', 'Interpretación práctica de cada cláusula', 'Documentación y registros', 'Auditoría interna: planificación, ejecución e informe', 'Preparación para la auditoría de certificación'] },
    ],
    imagen: '/images/capacitaciones.webp',
    orden: 10,
  },
  {
    slug: 'validacion-de-metodos-y-calculo-de-incertidumbre',
    titulo: 'Validación de métodos y cálculo de incertidumbre',
    categoria: 'capacitacion',
    resumen:
      'Parámetros de desempeño, tipos de error y estimación de incertidumbre con ejercicios prácticos.',
    descripcion:
      '<p>Curso teórico-práctico para <strong>validar métodos analíticos</strong> y estimar la incertidumbre de medición según los requisitos de NCh-ISO/IEC 17025, con ejemplos y ejercicios aplicados a la realidad de cada laboratorio.</p>',
    dirigidoA: 'Encargados de calidad, jefes de laboratorio y analistas de laboratorio.',
    temario: [
      { titulo: 'Métodos de validación', items: ['Normalizados o de referencia', 'Alternativos', 'Basados en métodos de referencia', 'Otros métodos'] },
      { titulo: 'Caracterización de las mediciones y sus tipos de error', items: ['Errores crasos', 'Errores sistemáticos', 'Errores aleatorios', 'Error total'] },
      { titulo: 'Parámetros de desempeño en la validación', items: ['Límite de detección y cuantificación', 'Exactitud', 'Precisión (repetibilidad, reproducibilidad)', 'Confirmación de la identidad', 'Intervalo de trabajo', 'Selectividad y especificidad', 'Linealidad', 'Sensibilidad', 'Veracidad (sesgo y recuperación)', 'Robustez'] },
      { titulo: 'Conceptos básicos de incertidumbre', items: ['Conceptos y definiciones de incertidumbre', 'Alcance y aplicación de la incertidumbre', 'Tipos de error (sistemáticos y aleatorios)', 'Diagrama de identificación de las fuentes de incertidumbre (espina de pescado)', 'Ejemplos y ejercicios prácticos'] },
    ],
    imagen: '/images/laboratorio.webp',
    orden: 11,
  },
  {
    slug: 'resolucion-de-no-conformidades-y-acciones-correctivas',
    titulo: 'Resolución de no conformidades y acciones correctivas',
    categoria: 'capacitacion',
    resumen:
      'Detección de no conformidades, ciclo de la calidad, mejora continua y herramientas de análisis de causa raíz.',
    descripcion:
      '<p>Curso orientado a fortalecer la <strong>gestión de no conformidades</strong> y la implementación eficaz de acciones correctivas y preventivas, aplicando el ciclo PHVA y herramientas de análisis de causa raíz.</p>',
    dirigidoA: 'Encargados de calidad, jefes de área y analistas de laboratorio.',
    temario: [
      { titulo: 'Definiciones y conceptos de no conformidad', items: ['Evidencia', 'Criterio', 'Detección de no conformidades', 'Alcance de una no conformidad', 'Acciones correctivas', 'Acciones preventivas', 'Auditoría interna/externa (primera, segunda y tercera parte)'] },
      { titulo: 'Ciclo de la calidad', items: ['Planificar', 'Hacer', 'Revisar', 'Actuar'] },
      { titulo: 'Mejora continua y sus herramientas', items: ['Reingeniería', 'Lean Manufacturing', '5S', 'Hoshin Planning'] },
      { titulo: 'Herramientas para el análisis de causa raíz', items: ['Diagrama de flujo (simbología)', 'Hoja de verificación / recogida de datos', 'Distribución de frecuencia', 'Histogramas', 'Diagrama de Pareto', 'Diagrama de causa y efecto', 'Diagrama de dispersión', 'Gráficos de control por atributos', 'Esquema de los cinco ¿por qué?'] },
    ],
    imagen: '/images/capacitaciones.webp',
    orden: 12,
  },
  {
    slug: 'buenas-practicas-de-laboratorio-bpl',
    titulo: 'Buenas prácticas de laboratorio (BPM y BPL)',
    categoria: 'capacitacion',
    resumen:
      'Calidad y BPL, manejo seguro de reactivos y operación correcta de equipos de medición.',
    descripcion:
      '<p>Curso práctico de <strong>buenas prácticas de laboratorio</strong> que cubre desde los fundamentos de calidad y trazabilidad hasta el manejo seguro de reactivos y la correcta operación de los equipos de medición.</p>',
    dirigidoA: 'Encargados de calidad, jefes de laboratorio y analistas de laboratorio.',
    temario: [
      { titulo: 'Introducción a la calidad y BPL', items: ['Definiciones y conceptos de calidad', 'Función integral del análisis químico', 'Lecturas y factores de corrección', 'Trazabilidad química', 'Sistema internacional de medida', 'Concepto de buenas prácticas de laboratorio (BPL)', 'Clasificación de materiales volumétricos', 'Manipulación de material de vidrio y su limpieza', 'Medición de volúmenes', 'Riesgos asociados a la mala manipulación'] },
      { titulo: 'Reactivos y sus riesgos', items: ['Tipos de reactivos y sus purezas', 'Certificados de análisis y su interpretación', 'Hoja de seguridad y su interpretación', 'Clasificación de reactivos y sus incompatibilidades', 'Almacenamiento de reactivos y sus condiciones ambientales', 'Etiquetado de reactivos', 'Disposición y caracterización de residuos peligrosos', 'Uso de equipos de protección personal'] },
      { titulo: 'Manejo de equipos de medición', items: ['Balanza analítica y balanza granataria', 'Estufas de aire forzado y convección natural', 'Mufla', 'Destilador / desionizador de agua', 'Espectrofotómetro', 'pH-metro', 'Conductivímetro', 'Termocuplas'] },
    ],
    imagen: '/images/hero-laboratorio.webp',
    orden: 13,
  },
  {
    slug: 'cromatografia-liquida-hplc',
    titulo: 'Cromatografía líquida de alta resolución (HPLC)',
    categoria: 'capacitacion',
    resumen:
      'Fundamentos, técnicas, columnas, sistemas de inyección, fases móviles, bombas y detectores.',
    descripcion:
      '<p>Curso de <strong>cromatografía líquida de alta resolución</strong> que entrega los fundamentos teóricos y prácticos para operar, optimizar y resolver problemas en sistemas HPLC.</p>',
    dirigidoA: 'Encargados de calidad, jefes de laboratorio y analistas de laboratorio.',
    temario: [
      { titulo: 'Nociones y fundamentos de la cromatografía líquida', items: ['Técnicas cromatográficas: fase normal, fase reversa y no convencionales'] },
      { titulo: 'Tipos de columnas cromatográficas', items: ['Funcionamiento', 'Características de las columnas', 'Precolumnas', 'Uso y precauciones'] },
      { titulo: 'Sistemas de inyección', items: ['Manual', 'Automático'] },
      { titulo: 'Fases móviles', items: ['Tipos de fases móviles', 'Tipos de solventes y sus mezclas', 'Horno, programación y control de temperatura'] },
      { titulo: 'Tipos de bombas', items: ['Recíprocas', 'Desplazamiento', 'Presión constante'] },
      { titulo: 'Tipos de detectores', items: ['UV-VIS', 'DAD', 'Fluorescencia', 'Índice de refracción', 'Espectrómetro de masas'] },
    ],
    imagen: '/images/laboratorio.webp',
    orden: 14,
  },
  {
    slug: 'cromatografia-gaseosa-gc-fid-gc-ms',
    titulo: 'Cromatografía gaseosa GC-FID y GC-MS/MS',
    categoria: 'capacitacion',
    resumen:
      'Columnas, gases, inyectores, detectores, muestreadores, validación y troubleshooting en GC.',
    descripcion:
      '<p>Curso de <strong>cromatografía de gases</strong> que abarca desde los fundamentos del proceso cromatográfico hasta la operación del equipo, el procesamiento de datos y la resolución de problemas, adaptado al equipo del cliente.</p>',
    dirigidoA: 'Encargados de calidad, jefes de laboratorio y analistas de laboratorio.',
    temario: [
      { titulo: 'Nociones y fundamentos de la cromatografía gaseosa', items: ['Proceso cromatográfico', 'Tipos de columnas de GC: funcionamiento, características (capilares y empacadas), uso y precauciones', 'Gases', 'Inyectores: tipos y funcionamiento', 'Horno, programación y control de temperatura', 'Separación isotérmica y con gradiente de temperatura', 'Detectores: tipos y funcionamiento (FID, ECD, TCD, FPD, NPD)'] },
      { titulo: 'Muestreadores', items: ['Líquidos', 'Head Space', 'ATD'] },
      { titulo: 'Manejo del equipo (adaptado al equipo del cliente)', items: ['Identificación', 'Calibración', 'Cuantificación', 'Validación de métodos', 'Mantenimiento de rutina y preventivo', 'Detector de conductividad térmica (TCD)', 'Detector de ionización de llama (FID)', 'Detector de captura electrónica (ECD y µECD)', 'Detector fotométrico de llama (FPD)', 'Detector de nitrógeno y fósforo (NPD)', 'Detector de masa y doble masa'] },
      { titulo: 'Procesamiento de datos y troubleshooting', items: ['Integración de los picos cromatográficos y su optimización (línea base)', 'Análisis cualitativo y cuantitativo', 'Problemas generales de los sistemas cromatográficos', 'Problemas de los sistemas de inyección y columnas', 'Problemas de resolución de los sistemas de detección'] },
    ],
    imagen: '/images/hero-laboratorio.webp',
    orden: 15,
  },
  {
    slug: 'analisis-por-icp-oes-e-icp-ms',
    titulo: 'Análisis por ICP-OES e ICP-MS',
    categoria: 'capacitacion',
    resumen:
      'Fundamentos del plasma inductivamente acoplado, componentes del equipo, configuraciones y troubleshooting.',
    descripcion:
      '<p>Proporcionar a los participantes los conocimientos y herramientas para entender los conceptos asociados al <strong>análisis con plasma inductivamente acoplado (ICP)</strong>, sus diferentes usos y configuraciones para detectar diversos analitos de interés.</p><ul><li>Conocer la terminología, definiciones y conceptos relacionados con la medición de metales por métodos ICP-OES e ICP-MS.</li><li>Conocer los diferentes componentes de un equipo ICP.</li><li>Conocer los sistemas ópticos y de masas acoplados a equipos ICP.</li><li>Conocer las diferentes configuraciones de los equipos ICP.</li><li>Ser capaz de realizar el procesamiento de datos y la resolución de problemas comunes en ICP (troubleshooting).</li></ul>',
    dirigidoA: 'Encargados de calidad, jefes de laboratorio y analistas de laboratorio.',
    temario: [
      { titulo: 'Fundamentos', items: ['Selección de la técnica adecuada: comparación AAS, ICP-OES e ICP-MS', 'Fundamentos de la técnica de ICP', 'Rango de trabajo', 'Aplicaciones en las diferentes matrices', 'Limitaciones metodológicas', 'Interferentes', 'Efecto de la matriz'] },
      { titulo: 'Elementos del equipo ICP-OES', items: ['Nociones y fundamentos de la técnica', 'Análisis de elementos mayoritarios, trazas y ultratrazas', 'Instrumentación de un ICP-OES: equipos secuenciales y simultáneos', 'Sistema de introducción de muestras', 'Visión axial, radial y dual (comparación)', 'Aplicación: análisis de muestras'] },
      { titulo: 'Elementos del equipo ICP-MS', items: ['Nociones y fundamentos de la técnica', 'Controles generales del equipo', 'Encendido del plasma y visualización de parámetros', 'Parámetros de optimización (tuning)', 'Interfaz plasma/vacío', 'Enfoque de iones, celda de colisión/reacción', 'Separación de iones'] },
    ],
    imagen: '/images/laboratorio.webp',
    orden: 16,
  },
];
