<?php
declare(strict_types=1);

require_once __DIR__ . '/../includes/admin_helpers.php';

require_admin();
$pdo = db();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $orderId = (int) ($_POST['order_id'] ?? 0);
    $fulfillment = (string) ($_POST['fulfillment_status'] ?? '');
    $allowed = array_keys(order_status_steps());
    $allowed[] = 'cancelled';

    if ($orderId > 0 && in_array($fulfillment, $allowed, true)) {
        $stmt = $pdo->prepare('UPDATE orders SET fulfillment_status = ? WHERE id = ?');
        $stmt->execute([$fulfillment, $orderId]);
        redirect_to('orders.php?id=' . $orderId);
    }
}

$orders = $pdo->query('SELECT * FROM orders ORDER BY created_at DESC LIMIT 100')->fetchAll();
$selected = isset($_GET['id']) ? (int) $_GET['id'] : null;
$items = [];

if ($selected) {
    $stmt = $pdo->prepare('SELECT * FROM order_items WHERE order_id = ?');
    $stmt->execute([$selected]);
    $items = $stmt->fetchAll();
}

admin_header('Compras');
?>
<section class="admin-head">
  <div>
    <span class="sec-tag">Pedidos</span>
    <h1>Compras</h1>
    <p>Pedidos guardados desde el carrito antes de abrir el email.</p>
  </div>
</section>

<section class="admin-grid">
  <article class="admin-card">
    <h2>Pedidos recientes</h2>
    <table class="admin-table">
      <thead><tr><th>ID</th><th>Cliente</th><th>WhatsApp</th><th>Total</th><th>Pago</th><th>Pedido</th><th>Fecha</th></tr></thead>
      <tbody>
      <?php foreach ($orders as $order): ?>
        <tr>
          <td><a href="orders.php?id=<?= (int) $order['id'] ?>">#<?= (int) $order['id'] ?></a></td>
          <td><?= e($order['customer_name']) ?><small><?= e($order['customer_email']) ?></small></td>
          <td><?= e($order['customer_whatsapp']) ?></td>
          <td><?= money($order['total']) ?></td>
          <td><?= e($order['payment_status']) ?></td>
          <td><?= e($order['fulfillment_status']) ?></td>
          <td><?= e($order['created_at']) ?></td>
        </tr>
      <?php endforeach; ?>
      </tbody>
    </table>
  </article>

  <article class="admin-card">
    <h2>Detalle <?= $selected ? '#' . $selected : '' ?></h2>
    <?php if (!$selected): ?>
      <p class="admin-muted">Selecciona un pedido para ver productos comprados.</p>
    <?php else: ?>
      <?php
        $orderStmt = $pdo->prepare('SELECT * FROM orders WHERE id = ?');
        $orderStmt->execute([$selected]);
        $selectedOrder = $orderStmt->fetch();
      ?>
      <?php if ($selectedOrder): ?>
        <form method="post" class="admin-status-form">
          <input type="hidden" name="order_id" value="<?= (int) $selectedOrder['id'] ?>">
          <label>Estado del pedido
            <select name="fulfillment_status">
              <?php foreach (order_status_steps() + ['cancelled' => 'Cancelado'] as $key => $label): ?>
                <option value="<?= e($key) ?>" <?= $selectedOrder['fulfillment_status'] === $key ? 'selected' : '' ?>><?= e($label) ?></option>
              <?php endforeach; ?>
            </select>
          </label>
          <button class="btn-outline-g" type="submit">Actualizar estado</button>
        </form>
      <?php endif; ?>
      <table class="admin-table">
        <thead><tr><th>Producto</th><th>Variante</th><th>Cant.</th><th>Subtotal</th></tr></thead>
        <tbody>
        <?php foreach ($items as $item): ?>
          <tr><td><?= e($item['product_name']) ?></td><td><?= e((string) $item['variant_label']) ?></td><td><?= (int) $item['quantity'] ?></td><td><?= money($item['subtotal']) ?></td></tr>
        <?php endforeach; ?>
        </tbody>
      </table>
    <?php endif; ?>
  </article>
</section>
<?php admin_footer(); ?>
