<?php
declare(strict_types=1);

require_once __DIR__ . '/auth.php';
require_once __DIR__ . '/../config/site.php';

function public_order_token(): string
{
    return bin2hex(random_bytes(18));
}

function order_items_for_email(int $orderId): array
{
    $stmt = db()->prepare('SELECT * FROM order_items WHERE order_id = ? ORDER BY id');
    $stmt->execute([$orderId]);
    return $stmt->fetchAll();
}

function notify_admin_order_paid(int $orderId): void
{
    $stmt = db()->prepare('SELECT * FROM orders WHERE id = ? LIMIT 1');
    $stmt->execute([$orderId]);
    $order = $stmt->fetch();

    if (!$order) {
        return;
    }

    $items = order_items_for_email($orderId);
    $lines = [
        'Nueva compra pagada VYNTRA',
        '',
        'Pedido #' . $order['id'],
        'Cliente: ' . $order['customer_name'],
        'Email: ' . $order['customer_email'],
        'WhatsApp: ' . $order['customer_whatsapp'],
        'Total: $' . number_format((float) $order['total'], 0, ',', '.'),
        'Estado pago: ' . $order['payment_status'],
        '',
        'Productos:',
    ];

    foreach ($items as $item) {
        $lines[] = '- ' . $item['quantity'] . ' x ' . $item['product_name'] . ' | ' . $item['variant_label'] . ' | $' . number_format((float) $item['subtotal'], 0, ',', '.');
    }

    if (!empty($order['message'])) {
        $lines[] = '';
        $lines[] = 'Mensaje: ' . $order['message'];
    }

    @mail(SITE_ORDER_EMAIL, 'Compra pagada VYNTRA #' . $order['id'], implode("\n", $lines));
}

function order_status_steps(): array
{
    return [
        'received' => 'Pedido recibido',
        'preparing' => 'Preparando',
        'packed' => 'Empaquetado',
        'shipped' => 'En camino',
        'delivered' => 'Entregado',
    ];
}
