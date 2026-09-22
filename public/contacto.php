<?php
/**
 * Formulario de contacto — vortec-consulting.com
 * Mismo esquema que grilliabogados.cl: POST vía fetch → JSON {success, message}.
 * Envía con mail() de PHP (cPanel). Destinatarios configurables por contacto-config.php o variables de entorno.
 */
declare(strict_types=1);

$SITE_URL = (isset($_SERVER['HTTP_HOST']) && is_string($_SERVER['HTTP_HOST']) && $_SERVER['HTTP_HOST'] !== '')
  ? ('https://' . $_SERVER['HTTP_HOST'])
  : 'https://vortec-consulting.com';

$TO_EMAILS_BASE = 'contacto@vortec-consulting.com, codigoraul@gmail.com';
$TO_EMAIL   = $TO_EMAILS_BASE;
// El correo de vortec-consulting.com vive en Google Workspace y su SPF no autoriza al hosting,
// así que se envía desde un dominio propio (SPF con la IP de este servidor) y Reply-To al cliente.
$FROM_EMAIL = 'web@xn--diseopaginas-dhb.cl';
$FROM_NAME  = 'Vortec Consulting Web';
$BCC_EMAILS = '';
$CONFIG_USED_PATH = '';

foreach (['SITE_URL' => 'SITE_URL', 'CONTACT_TO_EMAIL' => 'TO_EMAIL', 'CONTACT_FROM_EMAIL' => 'FROM_EMAIL', 'CONTACT_FROM_NAME' => 'FROM_NAME', 'CONTACT_BCC_EMAILS' => 'BCC_EMAILS'] as $env => $var) {
  $v = getenv($env);
  if ($v !== false && $v !== '') {
    $$var = $var === 'TO_EMAIL' ? $TO_EMAILS_BASE . ', ' . $v : $v;
  }
}

foreach ([__DIR__ . '/contacto-config.php', dirname(__DIR__) . '/contacto-config.php'] as $configPath) {
  if (is_file($configPath)) {
    $config = include $configPath;
    if (is_array($config)) {
      if (isset($config['SITE_URL']) && is_string($config['SITE_URL']))   $SITE_URL = $config['SITE_URL'];
      if (isset($config['TO_EMAIL']) && is_string($config['TO_EMAIL']))   $TO_EMAIL = $TO_EMAILS_BASE . ', ' . $config['TO_EMAIL'];
      if (isset($config['FROM_EMAIL']) && is_string($config['FROM_EMAIL'])) $FROM_EMAIL = $config['FROM_EMAIL'];
      if (isset($config['FROM_NAME']) && is_string($config['FROM_NAME']))  $FROM_NAME = $config['FROM_NAME'];
      if (isset($config['BCC_EMAILS']) && is_string($config['BCC_EMAILS'])) $BCC_EMAILS = $config['BCC_EMAILS'];
    }
    $CONFIG_USED_PATH = $configPath;
    break;
  }
}

function json_out(bool $success, string $message): void {
  header('Content-Type: application/json; charset=UTF-8');
  echo json_encode(['success' => $success, 'message' => $message], JSON_UNESCAPED_UNICODE);
  exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  if (isset($_GET['debug']) && $_GET['debug'] === '1') {
    header('Content-Type: application/json; charset=UTF-8');
    echo json_encode([
      'handler' => 'contacto.php',
      'site_url' => $SITE_URL,
      'to_email' => $TO_EMAIL,
      'from_email' => $FROM_EMAIL,
      'from_name' => $FROM_NAME,
      'bcc_emails' => $BCC_EMAILS !== '' ? $BCC_EMAILS : null,
      'config_used' => $CONFIG_USED_PATH !== '' ? basename($CONFIG_USED_PATH) : null,
      'mail_function' => function_exists('mail'),
    ], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    exit;
  }
  header('Location: ' . rtrim($SITE_URL, '/') . '/contacto', true, 303);
  exit;
}

// Honeypot anti-spam
if (trim((string)($_POST['_gotcha'] ?? '')) !== '') {
  json_out(true, '¡Mensaje enviado exitosamente!');
}

$sanitizeHeaderValue = static fn(string $v): string => trim(str_replace(["\r", "\n"], ' ', $v));
$escape = static fn(string $v): string => htmlspecialchars($v, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
$encodeDisplayName = static function (string $v) use ($sanitizeHeaderValue): string {
  $v = $sanitizeHeaderValue($v);
  return $v === '' ? '' : '=?UTF-8?B?' . base64_encode($v) . '?=';
};
$parseEmailList = static function (string $value) use ($sanitizeHeaderValue): array {
  $parts = preg_split('/[\s,;]+/', $sanitizeHeaderValue($value), -1, PREG_SPLIT_NO_EMPTY) ?: [];
  $emails = [];
  foreach ($parts as $p) {
    $p = $sanitizeHeaderValue($p);
    if ($p !== '' && filter_var($p, FILTER_VALIDATE_EMAIL)) $emails[] = $p;
  }
  return array_values(array_unique($emails));
};

$campo = static fn(string $k, int $max = 500): string => mb_substr(trim(str_replace(["\r", "\n"], ' ', (string)($_POST[$k] ?? ''))), 0, $max);

$nombre   = $campo('nombre', 120);
$empresa  = $campo('empresa', 120);
$email    = $campo('email', 160);
$telefono = $campo('telefono', 40);
$servicio = $campo('servicio', 160);
$mensaje  = mb_substr(trim((string)($_POST['mensaje'] ?? '')), 0, 4000);

if ($nombre === '' || $email === '' || $mensaje === '') {
  json_out(false, 'Por favor completa todos los campos obligatorios.');
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
  json_out(false, 'El correo electrónico ingresado no es válido.');
}

$subject = 'Nueva consulta desde Vortec Consulting' . ($servicio !== '' ? ': ' . $servicio : '');

$row = static fn(string $label, string $value, bool $top = false): string =>
  '<tr><td style="padding:12px; border:1px solid #E5E7EB; font-weight:700; width:180px; background:#F9FAFB;' . ($top ? ' vertical-align:top;' : '') . '">' . $label . '</td>'
  . '<td style="padding:12px; border:1px solid #E5E7EB;">' . $value . '</td></tr>';

$bodyHtml = '<!doctype html><html><head><meta charset="UTF-8"></head><body style="font-family:Arial,Helvetica,sans-serif; color:#0b1f3a;">'
  . '<h2 style="margin:0 0 16px; font-size:20px; color:#0047a1;">Nueva consulta desde Vortec Consulting</h2>'
  . '<table cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse; width:100%; max-width:640px;"><tbody>'
  . $row('Nombre', $escape($nombre))
  . $row('Empresa', $empresa !== '' ? $escape($empresa) : '-')
  . $row('Email', $escape($email))
  . $row('Teléfono', $telefono !== '' ? $escape($telefono) : '-')
  . $row('Servicio de interés', $servicio !== '' ? $escape($servicio) : '-')
  . $row('Mensaje', nl2br($escape($mensaje)), true)
  . '</tbody></table>'
  . '<p style="margin-top:24px; font-size:12px; color:#6B7280;">Este mensaje fue enviado desde el formulario de contacto de vortec-consulting.com · ' . date('d-m-Y H:i') . '</p>'
  . '</body></html>';

$bodyText = "Nueva consulta desde Vortec Consulting\n\n"
  . "Nombre: {$nombre}\n"
  . "Empresa: " . ($empresa !== '' ? $empresa : '-') . "\n"
  . "Email: {$email}\n"
  . "Teléfono: " . ($telefono !== '' ? $telefono : '-') . "\n"
  . "Servicio de interés: " . ($servicio !== '' ? $servicio : '-') . "\n\n"
  . "Mensaje:\n{$mensaje}\n";

$boundary = 'vortec_' . bin2hex(random_bytes(12));
$body = "--{$boundary}\r\n"
  . "Content-Type: text/plain; charset=UTF-8\r\nContent-Transfer-Encoding: 8bit\r\n\r\n" . $bodyText . "\r\n\r\n"
  . "--{$boundary}\r\n"
  . "Content-Type: text/html; charset=UTF-8\r\nContent-Transfer-Encoding: 8bit\r\n\r\n" . $bodyHtml . "\r\n\r\n"
  . "--{$boundary}--\r\n";

$host = parse_url($SITE_URL, PHP_URL_HOST);
if (!is_string($host) || $host === '') $host = 'vortec-consulting.com';

$headers = [
  'MIME-Version: 1.0',
  'Content-Type: multipart/alternative; boundary="' . $boundary . '"',
  'Date: ' . date(DATE_RFC2822),
  'Message-ID: <' . bin2hex(random_bytes(16)) . '@' . $host . '>',
  'From: ' . $encodeDisplayName($FROM_NAME) . ' <' . $sanitizeHeaderValue($FROM_EMAIL) . '>',
  'Reply-To: ' . ($encodeDisplayName($nombre) !== '' ? $encodeDisplayName($nombre) . ' ' : '') . '<' . $sanitizeHeaderValue($email) . '>',
];
$bccEmails = $parseEmailList($BCC_EMAILS);
if ($bccEmails !== []) $headers[] = 'Bcc: ' . implode(', ', $bccEmails);

$toEmails = $parseEmailList($TO_EMAIL);
$toHeader = $toEmails !== [] ? implode(', ', $toEmails) : $sanitizeHeaderValue($TO_EMAIL);
$subjectEnc = '=?UTF-8?B?' . base64_encode($subject) . '?=';

$ok = @mail($toHeader, $subjectEnc, $body, implode("\r\n", $headers), '-f ' . $sanitizeHeaderValue($FROM_EMAIL));
if (!$ok) {
  $ok = @mail($toHeader, $subjectEnc, $body, implode("\r\n", $headers));
}

if ($ok) {
  json_out(true, '¡Mensaje enviado exitosamente! Nos pondremos en contacto contigo pronto.');
}
json_out(false, 'No se pudo enviar el mensaje. Por favor intenta nuevamente o escríbenos por WhatsApp.');
