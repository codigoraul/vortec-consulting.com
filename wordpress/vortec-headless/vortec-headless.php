<?php
/**
 * Plugin Name: Vortec Headless
 * Description: Registra el tipo de contenido "Servicios" y la página "Datos de contacto" para el sitio Astro de vortec-consulting.com (WordPress headless). No requiere ACF.
 * Version:     1.0.0
 * Author:      diseñopaginas.cl
 *
 * Instalación: subir esta carpeta/archivo a wp-content/plugins/vortec-headless/ y activar,
 *              o copiarlo a wp-content/mu-plugins/ para que quede siempre activo.
 *
 * Endpoints que consume Astro:
 *   GET /wp-json/wp/v2/servicios?per_page=100&_embed
 *   GET /wp-json/vortec/v1/contacto
 */

if (!defined('ABSPATH')) exit;

/* ───────────────────────── CPT: Servicios ───────────────────────── */
add_action('init', function () {
    register_post_type('servicio', [
        'labels' => [
            'name'               => 'Servicios',
            'singular_name'      => 'Servicio',
            'add_new'            => 'Añadir servicio',
            'add_new_item'       => 'Añadir nuevo servicio',
            'edit_item'          => 'Editar servicio',
            'new_item'           => 'Nuevo servicio',
            'view_item'          => 'Ver servicio',
            'search_items'       => 'Buscar servicios',
            'not_found'          => 'No hay servicios',
            'all_items'          => 'Todos los servicios',
            'menu_name'          => 'Servicios',
        ],
        'public'        => true,
        'show_in_rest'  => true,
        'rest_base'     => 'servicios',
        'menu_icon'     => 'dashicons-clipboard',
        'menu_position' => 5,
        'supports'      => ['title', 'editor', 'excerpt', 'thumbnail', 'page-attributes', 'custom-fields'],
        'has_archive'   => false,
        'rewrite'       => ['slug' => 'servicios'],
    ]);

    // Campos personalizados visibles en la REST API (meta.*)
    $campos = [
        'categoria'  => ['type' => 'string', 'default' => 'consultoria', 'description' => 'consultoria | capacitacion'],
        'resumen'    => ['type' => 'string', 'default' => '', 'description' => 'Resumen corto (1-2 líneas) para las tarjetas'],
        'dirigido_a' => ['type' => 'string', 'default' => '', 'description' => 'Público objetivo del curso'],
        'temario'    => ['type' => 'string', 'default' => '', 'description' => 'Módulos: título en una línea, ítems con "- ", módulos separados por línea en blanco'],
        'imagen_url' => ['type' => 'string', 'default' => '', 'description' => 'URL de imagen alternativa si no hay imagen destacada'],
    ];
    foreach ($campos as $clave => $cfg) {
        register_post_meta('servicio', $clave, [
            'type'          => $cfg['type'],
            'single'        => true,
            'default'       => $cfg['default'],
            'description'   => $cfg['description'],
            'show_in_rest'  => true,
            'sanitize_callback' => $clave === 'temario' ? 'sanitize_textarea_field' : 'sanitize_text_field',
            'auth_callback' => fn() => current_user_can('edit_posts'),
        ]);
    }
});

/* Meta box amigable para editar los campos del servicio */
add_action('add_meta_boxes', function () {
    add_meta_box('vortec_servicio', 'Datos del servicio (sitio web)', function ($post) {
        wp_nonce_field('vortec_servicio_guardar', 'vortec_servicio_nonce');
        $g = fn($k) => esc_attr(get_post_meta($post->ID, $k, true));
        $cat = get_post_meta($post->ID, 'categoria', true) ?: 'consultoria';
        ?>
        <style>.vortec-campo{margin:0 0 14px}.vortec-campo label{display:block;font-weight:600;margin-bottom:4px}.vortec-campo input,.vortec-campo select,.vortec-campo textarea{width:100%}.vortec-campo small{color:#666}</style>
        <div class="vortec-campo">
            <label for="vortec_categoria">Categoría</label>
            <select name="categoria" id="vortec_categoria">
                <option value="consultoria" <?php selected($cat, 'consultoria'); ?>>Consultoría</option>
                <option value="capacitacion" <?php selected($cat, 'capacitacion'); ?>>Capacitación</option>
            </select>
        </div>
        <div class="vortec-campo">
            <label for="vortec_resumen">Resumen corto (tarjetas y buscadores)</label>
            <input type="text" name="resumen" id="vortec_resumen" maxlength="200" value="<?php echo $g('resumen'); ?>">
            <small>1-2 líneas. Si se deja vacío se usa el extracto.</small>
        </div>
        <div class="vortec-campo">
            <label for="vortec_dirigido_a">Dirigido a</label>
            <input type="text" name="dirigido_a" id="vortec_dirigido_a" value="<?php echo $g('dirigido_a'); ?>" placeholder="Encargados de calidad, jefes de laboratorio y analistas">
        </div>
        <div class="vortec-campo">
            <label for="vortec_temario">Temario / etapas</label>
            <textarea name="temario" id="vortec_temario" rows="12" placeholder="Métodos de validación&#10;- Normalizados o de referencia&#10;- Alternativos&#10;&#10;Parámetros de desempeño&#10;- Exactitud&#10;- Precisión"><?php echo esc_textarea(get_post_meta($post->ID, 'temario', true)); ?></textarea>
            <small>Título del módulo en una línea, cada ítem empieza con "- ". Deje una línea en blanco entre módulos.</small>
        </div>
        <div class="vortec-campo">
            <label for="vortec_imagen_url">URL de imagen (opcional)</label>
            <input type="text" name="imagen_url" placeholder="/images/nombre.webp o https://..." id="vortec_imagen_url" value="<?php echo $g('imagen_url'); ?>">
            <small>Se usa solo si no hay "Imagen destacada". El orden en el sitio se controla con "Orden" en Atributos.</small>
        </div>
        <?php
    }, 'servicio', 'normal', 'high');
});

add_action('save_post_servicio', function ($post_id) {
    if (!isset($_POST['vortec_servicio_nonce']) || !wp_verify_nonce($_POST['vortec_servicio_nonce'], 'vortec_servicio_guardar')) return;
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) return;
    if (!current_user_can('edit_post', $post_id)) return;
    foreach (['categoria', 'resumen', 'dirigido_a', 'imagen_url'] as $k) {
        if (isset($_POST[$k])) update_post_meta($post_id, $k, sanitize_text_field(wp_unslash($_POST[$k])));
    }
    if (isset($_POST['temario'])) update_post_meta($post_id, 'temario', sanitize_textarea_field(wp_unslash($_POST['temario'])));
});

/* Columnas en el listado */
add_filter('manage_servicio_posts_columns', function ($cols) {
    return ['cb' => $cols['cb'], 'title' => 'Título', 'categoria' => 'Categoría', 'menu_order' => 'Orden', 'date' => 'Fecha'];
});
add_action('manage_servicio_posts_custom_column', function ($col, $id) {
    if ($col === 'categoria') echo get_post_meta($id, 'categoria', true) === 'capacitacion' ? 'Capacitación' : 'Consultoría';
    if ($col === 'menu_order') echo (int) get_post($id)->menu_order;
}, 10, 2);

/* ───────────────────────── Datos de contacto ───────────────────────── */
const VORTEC_CONTACTO_CAMPOS = [
    'empresa'   => 'Nombre de la empresa',
    'tagline'   => 'Eslogan',
    'telefono'  => 'Teléfono (visible, ej. +56 9 7668 4877)',
    'whatsapp'  => 'WhatsApp (solo números, ej. 56976684877)',
    'email'     => 'Correo de contacto',
    'direccion' => 'Dirección',
    'comuna'    => 'Comuna',
    'ciudad'    => 'Ciudad / Región',
    'horario'   => 'Horario de atención',
    'mapaEmbed' => 'URL de Google Maps (embed)',
    'linkedin'  => 'LinkedIn (URL)',
    'instagram' => 'Instagram (URL)',
    'facebook'  => 'Facebook (URL)',
];

add_action('admin_menu', function () {
    add_menu_page('Datos de contacto', 'Datos de contacto', 'manage_options', 'vortec-contacto', function () {
        ?>
        <div class="wrap">
            <h1>Datos de contacto del sitio web</h1>
            <p>Estos datos se muestran en la cabecera, pie de página y página de contacto de vortec-consulting.com. Tras guardar, el sitio se regenera automáticamente.</p>
            <form method="post" action="options.php">
                <?php settings_fields('vortec_contacto'); ?>
                <table class="form-table">
                    <?php $op = get_option('vortec_contacto', []);
                    foreach (VORTEC_CONTACTO_CAMPOS as $k => $label): ?>
                    <tr>
                        <th scope="row"><label for="vc_<?php echo $k; ?>"><?php echo esc_html($label); ?></label></th>
                        <td><input type="text" class="regular-text" id="vc_<?php echo $k; ?>" name="vortec_contacto[<?php echo $k; ?>]" value="<?php echo esc_attr($op[$k] ?? ''); ?>"></td>
                    </tr>
                    <?php endforeach; ?>
                </table>
                <?php submit_button('Guardar datos'); ?>
            </form>
        </div>
        <?php
    }, 'dashicons-phone', 6);
});

add_action('admin_init', function () {
    register_setting('vortec_contacto', 'vortec_contacto', [
        'type' => 'array',
        'sanitize_callback' => function ($in) {
            $out = [];
            foreach (VORTEC_CONTACTO_CAMPOS as $k => $_) {
                $v = trim((string) ($in[$k] ?? ''));
                $out[$k] = in_array($k, ['mapaEmbed', 'linkedin', 'instagram', 'facebook'], true) ? esc_url_raw($v) : sanitize_text_field($v);
            }
            if ($out['whatsapp'] === '' && $out['telefono'] !== '') $out['whatsapp'] = preg_replace('/\D/', '', $out['telefono']);
            return $out;
        },
    ]);
});

/* Endpoint público: /wp-json/vortec/v1/contacto */
add_action('rest_api_init', function () {
    register_rest_route('vortec/v1', '/contacto', [
        'methods'             => 'GET',
        'permission_callback' => '__return_true',
        'callback'            => fn() => rest_ensure_response((array) get_option('vortec_contacto', [])),
    ]);
});

/* ───────────────────────── Importador de contenido inicial ─────────────────────────
 * Submenú "Datos de contacto → Importar contenido inicial": carga los servicios y datos
 * de contacto desde seed.json (mismo contenido que src/data/ del proyecto Astro).
 * Solo crea servicios cuyo slug no exista; no borra ni sobreescribe nada.
 */
add_action('admin_menu', function () {
    add_submenu_page('vortec-contacto', 'Importar contenido inicial', 'Importar contenido inicial', 'manage_options', 'vortec-importar', function () {
        $seedFile = __DIR__ . '/seed.json';
        $resultado = null;
        if (isset($_POST['vortec_importar']) && check_admin_referer('vortec_importar_nonce')) {
            $resultado = vortec_importar_seed($seedFile, !empty($_POST['sobrescribir_contacto']));
        }
        $existentes = wp_count_posts('servicio');
        $total = ($existentes->publish ?? 0) + ($existentes->draft ?? 0);
        ?>
        <div class="wrap">
            <h1>Importar contenido inicial</h1>
            <?php if ($resultado): ?>
                <div class="notice notice-success"><p><?php echo esc_html($resultado); ?></p></div>
            <?php endif; ?>
            <p>Carga los <strong>12 servicios</strong> (5 consultorías y 7 capacitaciones) y los <strong>datos de contacto</strong> con el contenido de la presentación de la empresa.</p>
            <p>Servicios existentes ahora: <strong><?php echo (int) $total; ?></strong>. Los servicios que ya existan (mismo slug) no se tocan.</p>
            <?php if (!file_exists($seedFile)): ?>
                <div class="notice notice-error"><p>No se encontró <code>seed.json</code> en la carpeta del plugin.</p></div>
            <?php else: ?>
            <form method="post">
                <?php wp_nonce_field('vortec_importar_nonce'); ?>
                <p><label><input type="checkbox" name="sobrescribir_contacto" value="1" <?php checked(empty(get_option('vortec_contacto'))); ?>> Reemplazar también los datos de contacto</label></p>
                <?php submit_button('Importar ahora', 'primary', 'vortec_importar'); ?>
            </form>
            <?php endif; ?>
        </div>
        <?php
    });
});

function vortec_importar_seed(string $archivo, bool $sobrescribirContacto): string {
    if (!file_exists($archivo)) return 'No se encontró seed.json.';
    $data = json_decode((string) file_get_contents($archivo), true);
    if (!is_array($data)) return 'seed.json no es válido.';

    $creados = 0; $omitidos = 0;
    foreach ($data['servicios'] ?? [] as $s) {
        if (get_page_by_path($s['slug'], OBJECT, 'servicio')) { $omitidos++; continue; }
        $id = wp_insert_post([
            'post_type'    => 'servicio',
            'post_status'  => 'publish',
            'post_title'   => $s['titulo'],
            'post_name'    => $s['slug'],
            'post_content' => $s['descripcion'],
            'post_excerpt' => $s['resumen'],
            'menu_order'   => (int) ($s['orden'] ?? 0),
            'meta_input'   => [
                'categoria'  => $s['categoria'],
                'resumen'    => $s['resumen'],
                'dirigido_a' => $s['dirigido_a'] ?? '',
                'temario'    => $s['temario'] ?? '',
                'imagen_url' => $s['imagen_url'] ?? '',
            ],
        ], true);
        if (!is_wp_error($id)) $creados++;
    }

    $msgContacto = '';
    if ($sobrescribirContacto && !empty($data['contacto'])) {
        $c = [];
        foreach (VORTEC_CONTACTO_CAMPOS as $k => $_) $c[$k] = (string) ($data['contacto'][$k] ?? '');
        update_option('vortec_contacto', $c);
        $msgContacto = ' Datos de contacto actualizados.';
    }
    return "Importación lista: $creados servicios creados, $omitidos ya existían.$msgContacto";
}

/* ───────────────────────── Webhook de despliegue (opcional) ─────────────────────────
 * Si se define VORTEC_DEPLOY_HOOK en wp-config.php (p. ej. un "repository_dispatch" de GitHub
 * Actions o un hook de Netlify/Vercel), se llama al guardar un servicio o los datos de contacto.
 */
function vortec_disparar_deploy(): void {
    if (!defined('VORTEC_DEPLOY_HOOK') || !VORTEC_DEPLOY_HOOK) return;
    $args = ['timeout' => 5, 'blocking' => false, 'method' => 'POST'];
    if (defined('VORTEC_DEPLOY_TOKEN') && VORTEC_DEPLOY_TOKEN) {
        $args['headers'] = ['Authorization' => 'Bearer ' . VORTEC_DEPLOY_TOKEN, 'Accept' => 'application/vnd.github+json', 'Content-Type' => 'application/json'];
        $args['body']    = wp_json_encode(['event_type' => 'wordpress-update']);
    }
    wp_remote_post(VORTEC_DEPLOY_HOOK, $args);
}
add_action('save_post_servicio', fn($id) => (wp_is_post_revision($id) || get_post_status($id) === 'auto-draft') ? null : vortec_disparar_deploy(), 20);
add_action('update_option_vortec_contacto', 'vortec_disparar_deploy');
