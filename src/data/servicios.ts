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

  {
    slug: 'evaluacion-de-servicio-de-control-de-plagas',
    titulo: 'Evaluación de servicio de control de plagas',
    categoria: 'consultoria',
    resumen:
      'Auditoría al proveedor de control de plagas: desratización, desinsectación, control de aves y sanitización, en planta y en sus oficinas.',
    descripcion:
      '<p>Auditamos al <strong>proveedor de servicio de control de plagas</strong> tanto en las instalaciones del cliente como en las oficinas del propio proveedor, verificando autorizaciones, competencias del personal, productos utilizados y respaldo documental. Entregamos un informe técnico con hallazgos y plan de acción.</p>',
    temario: [
      { titulo: 'Servicios evaluados', items: ['Desratización', 'Desinsectación', 'Control de aves', 'Sanitización'] },
      { titulo: 'Cumplimiento legal y técnico', items: ['Autorizaciones ante el SEREMI de Salud', 'Competencias técnicas del personal', 'Uso de productos autorizados en el ISP', 'Normativa legal y reglamentaria'] },
      { titulo: 'Revisión documental', items: ['Evaluación de informes técnicos y planos', 'Informe de hallazgos y recomendaciones'] },
    ],
    imagen: '/images/control-plagas.webp',
    orden: 6,
  },
  {
    slug: 'evaluacion-de-proveedores-de-materias-primas-insumos-y-envases',
    titulo: 'Evaluación de proveedores de materias primas, insumos y envases',
    categoria: 'consultoria',
    resumen:
      'Auditoría a proveedores nacionales e internacionales para verificar el cumplimiento de especificaciones comerciales y técnicas.',
    descripcion:
      '<p>Auditamos a <strong>proveedores nacionales e internacionales</strong> de materias primas, insumos y envases con el objetivo de evaluar el cumplimiento de las especificaciones comerciales y técnicas acordadas. El proceso termina con un informe técnico y un ranking de proveedores que apoya la toma de decisiones de compra.</p>',
    temario: [
      { titulo: 'Evaluación documental', items: ['Evaluación de cumplimiento regulatorio', 'Revisión de especificaciones técnicas de calidad física, química y microbiológica', 'Certificaciones vigentes', 'Revisión de hallazgos de auditorías de certificación del período anterior'] },
      { titulo: 'Evaluación en terreno', items: ['Flujo de proceso y puntos críticos de control', 'Inspección a instalaciones'] },
      { titulo: 'Cierre', items: ['Informe técnico', 'Evaluación y ranking de proveedores'] },
    ],
    imagen: '/images/proveedores-materias-primas.webp',
    orden: 7,
  },
  // ───────────────────────── CAPACITACIONES ─────────────────────────
  {
    slug: 'certificaciones-iso-bap-17025-asc-global-gap',
    titulo: 'Certificaciones ISO, BAP, 17025, ASC y GLOBAL G.A.P.',
    categoria: 'capacitacion',
    resumen:
      'Interpretación de normas y formación de auditores internos: ISO 9001, 14001, 22000, 45001, 50001, ISO/IEC 17025, ASC, RTRS, BAP y GLOBAL G.A.P.',
    descripcion:
      '<p>Curso de <strong>interpretación de normas y formación de auditores internos</strong> para procesos de certificación y acreditación: ISO 9001, ISO 14001, ISO 22000, ISO 45001, ISO 50001, ISO/IEC 17025, ASC Feed / Salmon, RTRS, BAP y GLOBAL G.A.P. Incluye interpretación de requisitos, implementación y auditoría interna.</p>',
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
    imagen: '/images/validacion-metodos.webp',
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
    imagen: '/images/no-conformidades.webp',
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
    imagen: '/images/hplc.webp',
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
    imagen: '/images/laboratorio.webp',
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
    imagen: '/images/icp.webp',
    orden: 16,
  },
  {
    slug: 'food-safety-higiene-y-seguridad',
    titulo: 'Food Safety / Higiene y Seguridad',
    categoria: 'capacitacion',
    resumen:
      'HACCP, ISO 22000 y certificación BRC: identificación de peligros, procedimientos estandarizados e inocuidad alimentaria.',
    descripcion:
      '<p>Curso diseñado para los profesionales de la <strong>industria alimentaria</strong> que desean cumplir con los estándares internacionales de inocuidad. Enseñamos por dónde empezar para implementar el sistema de Análisis de Peligros y Puntos Críticos de Control (HACCP), ISO 22000 y gestionar la certificación British Retail Consortium (BRC).</p><p>Aprenderá a identificar peligros críticos, desarrollar procedimientos estandarizados y aplicar estrategias que aseguren la inocuidad y calidad de los alimentos. Al finalizar, podrá mejorar las condiciones de inocuidad de la empresa, impactar positivamente en su reputación y aumentar la confianza de los clientes.</p>',
    dirigidoA: 'Profesionales de la industria alimentaria: encargados de calidad, inocuidad y producción.',
    temario: [
      { titulo: 'Sistemas de inocuidad', items: ['Análisis de Peligros y Puntos Críticos de Control (HACCP)', 'ISO 22000', 'Certificación British Retail Consortium (BRC)'] },
      { titulo: 'Implementación', items: ['Identificación de peligros críticos', 'Desarrollo de procedimientos estandarizados', 'Estrategias para asegurar la inocuidad y calidad de los alimentos'] },
    ],
    imagen: '/images/food-safety.webp',
    orden: 18,
  },
  {
    slug: 'metrologia-fisica-y-quimica',
    titulo: 'Metrología física y química',
    categoria: 'capacitacion',
    resumen:
      'Conceptos, errores, verificación y calibración, patrones, certificados de calibración y trazabilidad de las mediciones.',
    descripcion:
      '<p>Curso que entrega las bases de la <strong>metrología física y química</strong> aplicada al laboratorio y a la industria: desde los conceptos y el Sistema Internacional de unidades hasta la interpretación de certificados de calibración, patrones y trazabilidad de las mediciones.</p>',
    dirigidoA: 'Encargados de calidad, jefes de laboratorio, analistas y personal a cargo de equipos de medición.',
    temario: [
      { titulo: 'Fundamentos', items: ['Conceptos y definiciones de metrología', 'Alcance y aplicación de la metrología', 'Metrología legal, científica e industrial', 'Medición, errores y metrología', 'Sistema Internacional de unidades de medida'] },
      { titulo: 'Errores y magnitudes', items: ['Tipos de error (sistemáticos y aleatorios)', 'Diagrama de identificación de las fuentes de error', 'Metrología física (balanzas, termocuplas, micrómetros, etc.)', 'Metrología química (precisión, exactitud, sesgo, etc.)', 'Órdenes de magnitud y cifras significativas', 'Incerteza relativa y absoluta'] },
      { titulo: 'Verificación y calibración', items: ['Verificación y calibración', 'Información clave en los certificados de calibración entregados por los certificadores', 'Patrones primarios y secundarios (p. ej. tipos de masas patrón y sus clases)', 'Protocolos de calibración y/o verificación'] },
      { titulo: 'Desempeño instrumental y trazabilidad', items: ['Rango de medida, escala, resolución, estabilidad y deriva', 'Variables independientes y dependientes del operador', 'Clase de exactitud, EMP y repetibilidad instrumental', 'Trazabilidad de las mediciones'] },
    ],
    imagen: '/images/metrologia.webp',
    orden: 19,
  },
  {
    slug: 'espectroscopia-de-absorcion-atomica',
    titulo: 'Espectroscopía de Absorción Atómica (E.A.A.)',
    categoria: 'capacitacion',
    resumen:
      'Fundamentos, ley de Lambert-Beer, lámparas, nebulizadores, atomización, generación de hidruros y detectores.',
    descripcion:
      '<p>Curso para conocer la terminología, definiciones y conceptos relacionados con la <strong>espectroscopía de absorción atómica</strong>: desde sus fundamentos físicos y la relación entre absorción y concentración hasta los componentes del equipo, sus limitaciones y precauciones de uso.</p>',
    dirigidoA: 'Analistas y jefes de laboratorio que operan o supervisan equipos de absorción atómica.',
    temario: [
      { titulo: 'Fundamentos', items: ['Nociones y fundamentos de la espectroscopía de absorción atómica', 'Relación entre absorción y concentración', 'Ley de Lambert-Beer', 'Proceso de absorción atómica', 'Características de la absorción atómica', 'Uso, limitaciones y precauciones', 'Tipos de gases y purezas'] },
      { titulo: 'Componentes del equipo', items: ['Fuentes radiantes (tipos de lámparas)', 'Monocromador', 'Nebulizadores', 'Quemadores'] },
      { titulo: 'Sistemas de atomización', items: ['Sistemas continuos', 'Sistemas discretos', 'Sistema electrotérmico (HG)', 'Vapor frío y generación de hidruros'] },
      { titulo: 'Detectores', items: ['Sistemas de haz simple', 'Sistemas de doble haz'] },
    ],
    imagen: '/images/absorcion-atomica.webp',
    orden: 20,
  },
  {
    slug: 'espectroscopia-infrarroja-nir-ftir',
    titulo: 'Espectroscopía Infrarroja NIR / FTIR',
    categoria: 'capacitacion',
    resumen:
      'Desde los fundamentos físicos hasta el análisis de datos multivariantes (PCR, PLS) y sus aplicaciones industriales.',
    descripcion:
      '<p>Curso que abarca desde los <strong>fundamentos físicos de la espectroscopía NIR / FTIR</strong> hasta la instrumentación, las técnicas de muestreo y el análisis de datos multivariantes (quimiometría), con foco en sus aplicaciones industriales.</p>',
    dirigidoA: 'Analistas, jefes de laboratorio y personal de control de calidad que utilizan o evalúan incorporar NIR / FTIR.',
    temario: [
      { titulo: 'Introducción y fundamentos teóricos', items: ['Espectro electromagnético: ubicación de la región del infrarrojo cercano (NIR) entre el visible y el infrarrojo medio (780 nm – 2500 nm / 12800 cm⁻¹ – 4000 cm⁻¹)', 'Bases moleculares: vibraciones moleculares, sobretonos (overtones) y bandas de combinación de enlaces que contienen hidrógeno (C-H, O-H, N-H, S-H)'] },
      { titulo: 'Instrumentación y modos de medición', items: ['Componentes del equipo NIR: fuentes de radiación (lámparas halógenas de tungsteno), dispositivos de selección de longitud de onda (redes de difracción, monocromadores, interferómetros FT-NIR) y detectores', 'Técnicas y accesorios de muestreo: reflectancia difusa (sólidos y polvos), transmitancia (líquidos transparentes y láminas), transflectancia e interactancia'] },
      { titulo: 'Quimiometría y procesamiento de datos', items: ['Preprocesamiento espectral: corrección de línea base, derivadas (1ª y 2ª), normalización y estándar de variabilidad normal (SNV)', 'Calibración multivariante: regresión por componentes principales (PCR) y mínimos cuadrados parciales (PLS)', 'Validación de modelos: coeficiente de determinación (R²), error cuadrático medio de calibración y validación cruzada'] },
    ],
    imagen: '/images/nir-ftir.webp',
    orden: 21,
  },
];
