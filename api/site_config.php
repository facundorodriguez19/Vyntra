<?php
declare(strict_types=1);

require_once __DIR__ . '/../config/site.php';

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

echo json_encode([
    'whatsappUrl' => whatsapp_url(),
], JSON_UNESCAPED_UNICODE);
