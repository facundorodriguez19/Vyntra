<?php
declare(strict_types=1);

require_once __DIR__ . '/../includes/orders.php';
require_once __DIR__ . '/../includes/stripe.php';

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'Metodo no permitido']);
    exit;
}

$payload = json_decode((string) file_get_contents('php://input'), true);
if (!is_array($payload)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'JSON invalido']);
    exit;
}

$customer = $payload['customer'] ?? [];
$items = $payload['items'] ?? [];

if (!is_array($customer) || !is_array($items) || !$items) {
    http_response_code(422);
    echo json_encode(['ok' => false, 'error' => 'Pedido incompleto']);
    exit;
}

$name = trim((string) ($customer['name'] ?? ''));
$email = trim((string) ($customer['email'] ?? ''));
$whatsapp = trim((string) ($customer['whatsapp'] ?? ''));
$message = trim((string) ($customer['message'] ?? ''));

if ($name === '' || !filter_var($email, FILTER_VALIDATE_EMAIL) || $whatsapp === '') {
    http_response_code(422);
    echo json_encode(['ok' => false, 'error' => 'Datos del cliente incompletos']);
    exit;
}

try {
    $pdo = db();
    $user = current_user();
    $pdo->beginTransaction();

    $orderTotal = 0.0;
    foreach ($items as $item) {
        $orderTotal += (float) ($item['priceValue'] ?? 0) * max(1, (int) ($item['quantity'] ?? 1));
    }

    if ($orderTotal <= 0) {
        throw new RuntimeException('El total del pedido debe ser mayor a cero.');
    }

    $publicToken = public_order_token();
    $orderStmt = $pdo->prepare('
        INSERT INTO orders (user_id, public_token, customer_name, customer_email, customer_whatsapp, message, total, currency, payment_status, fulfillment_status)
        VALUES (:user_id, :public_token, :customer_name, :customer_email, :customer_whatsapp, :message, :total, :currency, :payment_status, :fulfillment_status)
    ');
    $orderStmt->execute([
        'user_id' => $user['id'] ?? null,
        'public_token' => $publicToken,
        'customer_name' => $name,
        'customer_email' => $email,
        'customer_whatsapp' => $whatsapp,
        'message' => $message,
        'total' => $orderTotal,
        'currency' => STRIPE_CURRENCY,
        'payment_status' => 'unpaid',
        'fulfillment_status' => 'received',
    ]);

    $orderId = (int) $pdo->lastInsertId();
    $itemStmt = $pdo->prepare('
        INSERT INTO order_items (order_id, product_slug, product_name, variant_label, unit_price, quantity, subtotal)
        VALUES (:order_id, :product_slug, :product_name, :variant_label, :unit_price, :quantity, :subtotal)
    ');

    $lineItems = [];
    foreach ($items as $index => $item) {
        $quantity = max(1, (int) ($item['quantity'] ?? 1));
        $unitPrice = max(0, (float) ($item['priceValue'] ?? 0));
        $productName = trim((string) ($item['title'] ?? 'Producto VYNTRA'));
        $variant = trim((string) ($item['variantLabel'] ?? ''));

        $itemStmt->execute([
            'order_id' => $orderId,
            'product_slug' => trim((string) ($item['id'] ?? '')),
            'product_name' => $productName,
            'variant_label' => $variant,
            'unit_price' => $unitPrice,
            'quantity' => $quantity,
            'subtotal' => $unitPrice * $quantity,
        ]);

        $lineItems["line_items[$index][price_data][currency]"] = STRIPE_CURRENCY;
        $lineItems["line_items[$index][price_data][unit_amount]"] = stripe_amount($unitPrice);
        $lineItems["line_items[$index][price_data][product_data][name]"] = $variant ? $productName . ' - ' . $variant : $productName;
        $lineItems["line_items[$index][quantity]"] = $quantity;
    }

    $session = stripe_request('POST', '/v1/checkout/sessions', array_merge($lineItems, [
        'mode' => 'payment',
        'success_url' => STRIPE_SUCCESS_URL,
        'cancel_url' => STRIPE_CANCEL_URL,
        'customer_email' => $email,
        'client_reference_id' => (string) $orderId,
        'metadata[order_id]' => (string) $orderId,
        'metadata[public_token]' => $publicToken,
    ]));

    if (empty($session['id']) || empty($session['url'])) {
        throw new RuntimeException('Stripe no devolvio una sesion de pago valida.');
    }

    $update = $pdo->prepare('UPDATE orders SET stripe_checkout_session_id = ? WHERE id = ?');
    $update->execute([$session['id'], $orderId]);
    $pdo->commit();

    echo json_encode([
        'ok' => true,
        'orderId' => $orderId,
        'token' => $publicToken,
        'checkoutUrl' => $session['url'] ?? null,
    ], JSON_UNESCAPED_UNICODE);
} catch (Throwable $error) {
    if (isset($pdo) && $pdo->inTransaction()) {
        $pdo->rollBack();
    }
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => $error->getMessage()], JSON_UNESCAPED_UNICODE);
}
