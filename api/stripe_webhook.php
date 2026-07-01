<?php
declare(strict_types=1);

require_once __DIR__ . '/../includes/orders.php';
require_once __DIR__ . '/../includes/stripe.php';

$payload = (string) file_get_contents('php://input');
$signature = $_SERVER['HTTP_STRIPE_SIGNATURE'] ?? '';

if (!stripe_verify_signature($payload, $signature)) {
    http_response_code(400);
    echo 'Invalid signature';
    exit;
}

$event = json_decode($payload, true);
if (!is_array($event)) {
    http_response_code(400);
    echo 'Invalid payload';
    exit;
}

if (($event['type'] ?? '') === 'checkout.session.completed') {
    $session = $event['data']['object'] ?? [];
    $orderId = (int) ($session['metadata']['order_id'] ?? $session['client_reference_id'] ?? 0);
    $paymentStatus = $session['payment_status'] ?? '';

    if ($orderId > 0 && $paymentStatus === 'paid') {
        $stmt = db()->prepare('
            UPDATE orders
            SET payment_status = "paid",
                status = "paid",
                stripe_payment_intent_id = :payment_intent,
                paid_at = COALESCE(paid_at, NOW())
            WHERE id = :id
        ');
        $stmt->execute([
            'payment_intent' => $session['payment_intent'] ?? null,
            'id' => $orderId,
        ]);

        notify_admin_order_paid($orderId);
    }
}

http_response_code(200);
echo 'ok';
