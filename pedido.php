<?php
declare(strict_types=1);

require_once __DIR__ . '/includes/orders.php';

$sessionId = trim((string) ($_GET['session_id'] ?? ''));
$token = trim((string) ($_GET['token'] ?? ''));
$order = null;

if ($sessionId !== '') {
    $stmt = db()->prepare('SELECT * FROM orders WHERE stripe_checkout_session_id = ? LIMIT 1');
    $stmt->execute([$sessionId]);
    $order = $stmt->fetch();
} elseif ($token !== '') {
    $stmt = db()->prepare('SELECT * FROM orders WHERE public_token = ? LIMIT 1');
    $stmt->execute([$token]);
    $order = $stmt->fetch();
}

if (!$order) {
    http_response_code(404);
}

$items = [];
if ($order) {
    $items = order_items_for_email((int) $order['id']);
}

$steps = order_status_steps();
$currentIndex = $order ? array_search($order['fulfillment_status'], array_keys($steps), true) : false;
if ($currentIndex === false) $currentIndex = 0;
?>
<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Pedido - VYNTRA</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Playfair+Display:wght@600;700;800&display=swap" rel="stylesheet">
<link rel="stylesheet" href="css/vyntra_noir.css">
</head>
<body>
<nav>
  <a class="logo-wrap" href="index.html" aria-label="Inicio VYNTRA"><img class="logo-img" src="images/logoprincipaltexto.png" alt="VYNTRA"></a>
  <ul class="nav-center"><li><a href="ropa.html">Ropa</a></li><li><a href="accesorios.html">Accesorios</a></li><li><a href="kits.html">Kits</a></li><li><a href="temporada.html">Temporada</a></li><li><a href="contacto.html">Contacto</a></li></ul>
  <div class="nav-end"><a class="nav-icon" href="mis_pedidos.php">Mis pedidos</a><button class="nav-cta" type="button">Carrito <span class="cart-count">0</span></button><button class="nav-ham" type="button" aria-label="Abrir menu" aria-controls="menu-mobile" aria-expanded="false">&#9776;</button></div>
</nav>
<div class="mob" id="menu-mobile"><a href="ropa.html">Ropa</a><a href="accesorios.html">Accesorios</a><a href="kits.html">Kits</a><a href="temporada.html">Temporada</a><a href="contacto.html">Contacto</a><a href="mis_pedidos.php">Mis pedidos</a></div>

<main class="page-shell order-page">
  <?php if (!$order): ?>
    <section class="order-card"><span class="sec-tag">Pedido</span><h1>No encontramos ese pedido</h1><p>Si acabas de pagar, espera unos segundos y actualiza. La confirmacion del pago puede tardar un momento.</p></section>
  <?php else: ?>
    <section class="order-card">
      <span class="sec-tag">Pedido #<?= (int) $order['id'] ?></span>
      <h1>Seguimiento del pedido</h1>
      <p>Pago: <strong><?= e($order['payment_status']) ?></strong> · Total: <strong>$<?= number_format((float) $order['total'], 0, ',', '.') ?></strong></p>
      <div class="order-tracker">
        <?php $i = 0; foreach ($steps as $key => $label): ?>
          <div class="order-step <?= $i <= $currentIndex ? 'is-done' : '' ?>">
            <span><?= $i + 1 ?></span>
            <strong><?= e($label) ?></strong>
          </div>
        <?php $i++; endforeach; ?>
      </div>
      <?php if ($order['payment_status'] !== 'paid'): ?>
        <p class="admin-notice">Tu pago todavia esta pendiente. Si ya pagaste, la confirmacion puede demorar unos segundos.</p>
      <?php endif; ?>
    </section>

    <section class="order-card">
      <h2>Productos</h2>
      <table class="admin-table">
        <thead><tr><th>Producto</th><th>Variante</th><th>Cantidad</th><th>Subtotal</th></tr></thead>
        <tbody>
        <?php foreach ($items as $item): ?>
          <tr><td><?= e($item['product_name']) ?></td><td><?= e((string) $item['variant_label']) ?></td><td><?= (int) $item['quantity'] ?></td><td>$<?= number_format((float) $item['subtotal'], 0, ',', '.') ?></td></tr>
        <?php endforeach; ?>
        </tbody>
      </table>
    </section>
  <?php endif; ?>
</main>

<?php if ($sessionId !== ''): ?>
<script>localStorage.removeItem('vyntra-cart-v1');</script>
<?php endif; ?>
<script src="js/vyntra_noir.js"></script>
<script src="js/vyntra_i18n.js"></script>
</body>
</html>
