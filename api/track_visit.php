<?php
declare(strict_types=1);

require_once __DIR__ . '/../includes/auth.php';

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false]);
    exit;
}

$payload = json_decode((string) file_get_contents('php://input'), true);
if (!is_array($payload)) {
    $payload = [];
}

try {
    start_app_session();
    $user = current_user();
    $path = substr((string) ($payload['path'] ?? ($_SERVER['REQUEST_URI'] ?? '/')), 0, 255);
    $title = substr((string) ($payload['title'] ?? ''), 0, 180);
    $referrer = substr((string) ($payload['referrer'] ?? ''), 0, 255);
    $agent = substr((string) ($_SERVER['HTTP_USER_AGENT'] ?? ''), 0, 255);
    $now = new DateTimeImmutable('now');

    $stmt = db()->prepare('
        INSERT INTO site_visits (user_id, session_id, page_title, path, referrer, user_agent, ip_address, visited_date, visited_hour)
        VALUES (:user_id, :session_id, :page_title, :path, :referrer, :user_agent, :ip_address, :visited_date, :visited_hour)
    ');
    $stmt->execute([
        'user_id' => $user['id'] ?? null,
        'session_id' => session_id(),
        'page_title' => $title,
        'path' => $path,
        'referrer' => $referrer,
        'user_agent' => $agent,
        'ip_address' => $_SERVER['REMOTE_ADDR'] ?? null,
        'visited_date' => $now->format('Y-m-d'),
        'visited_hour' => (int) $now->format('G'),
    ]);

    echo json_encode(['ok' => true]);
} catch (Throwable $error) {
    echo json_encode(['ok' => false]);
}
