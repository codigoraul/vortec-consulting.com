<?php
/**
 * Formulario de contacto — vortec-consulting.com
 * Recibe el POST del formulario (Astro) y envía el correo con mail() de PHP (cPanel).
 * Se copia tal cual a dist/ en el build y funciona en el hosting.
 */
declare(strict_types=1);

$DESTINO   = 'contacto@vortec-consulting.com';
$REMITENTE = 'web@vortec-consulting.com'; // debe ser del mismo dominio para no caer en spam
$GRACIAS   = '/gracias';
$ORIGEN    = '/contacto';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: ' . $ORIGEN, true, 303);
    exit;
}

// Honeypot: si el campo oculto viene lleno, es un bot.
if (!empty($_POST['sitio_web'])) {
    header('Location: ' . $GRACIAS, true, 303);
    exit;
}

$limpiar = static function (string $k, int $max = 500): string {
    $v = trim((string) ($_POST[$k] ?? ''));
    $v = str_replace(["\r", "\n"], ' ', $v); // evita inyección de cabeceras
    return mb_substr(strip_tags($v), 0, $max);
};

$nombre   = $limpiar('nombre', 120);
$empresa  = $limpiar('empresa', 120);
$email    = $limpiar('email', 160);
$telefono = $limpiar('telefono', 40);
$servicio = $limpiar('servicio', 160);
$mensaje  = mb_substr(strip_tags(trim((string) ($_POST['mensaje'] ?? ''))), 0, 4000);

if ($nombre === '' || $mensaje === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    header('Location: ' . $ORIGEN . '?error=1', true, 303);
    exit;
}

$asunto = '[Web] Nueva consulta' . ($servicio !== '' ? ' — ' . $servicio : '') . ' — ' . $nombre;

$cuerpo  = "Nueva consulta desde vortec-consulting.com\n\n";
$cuerpo .= "Nombre:    $nombre\n";
$cuerpo .= "Empresa:   " . ($empresa ?: '-') . "\n";
$cuerpo .= "Correo:    $email\n";
$cuerpo .= "Teléfono:  " . ($telefono ?: '-') . "\n";
$cuerpo .= "Servicio:  " . ($servicio ?: '-') . "\n\n";
$cuerpo .= "Mensaje:\n$mensaje\n\n";
$cuerpo .= "---\nFecha: " . date('d-m-Y H:i') . "\nIP: " . ($_SERVER['REMOTE_ADDR'] ?? '-') . "\n";

$headers  = "From: Vortec Consulting Web <$REMITENTE>\r\n";
$headers .= "Reply-To: $nombre <$email>\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
$headers .= "X-Mailer: PHP/" . PHP_VERSION . "\r\n";

$asuntoCodificado = '=?UTF-8?B?' . base64_encode($asunto) . '?=';
$ok = @mail($DESTINO, $asuntoCodificado, $cuerpo, $headers, '-f' . $REMITENTE);

header('Location: ' . ($ok ? $GRACIAS : $ORIGEN . '?error=2'), true, 303);
exit;
