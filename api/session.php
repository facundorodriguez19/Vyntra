<?php
declare(strict_types=1);

require_once __DIR__ . '/../includes/auth.php';

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

$databaseReady = true;

try {
    $user = current_user();
} catch (Throwable $error) {
    $databaseReady = false;
    $user = null;
}

echo json_encode([
    'authenticated' => $user !== null,
    'databaseReady' => $databaseReady,
    'user' => $user ? [
        'id' => (int) $user['id'],
        'name' => $user['name'],
        'email' => $user['email'],
        'isAdmin' => !empty($user['is_admin']),
    ] : null,
], JSON_UNESCAPED_UNICODE);
