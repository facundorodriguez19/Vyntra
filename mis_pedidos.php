<?php
declare(strict_types=1);

require_once __DIR__ . '/includes/orders.php';

$user = current_user();
if (!$user) {
    redirect_to('login.php');
}

$stmt = db()->prepare('SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC');
$stmt->execute([(int) $user['id']]);
$orders = $stmt->fetchAll();
?>
<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Mis pedidos - VYNTRA</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Playfair+Display:wght@600;700;800&display=swap" rel="stylesheet">
<link rel="stylesheet" href="css/vyntra_noir.css">
</head>
<body>
<nav>
  <a class="logo-wrap" href="index.html" aria-label="Inicio VYNTRA"><img class="logo-img" src="images/logoprincipaltexto.png" alt="VYNTRA"></a>
  <ul class="nav-center"><li><a href="ropa.html">Ropa</a></li><li><a href="accesorios.html">Accesorios</a></li><li><a href="kits.html">Kits</a></li><li><a href="temporada.html">Temporada</a></li><li><a href="contacto.html">Contacto</a></li></ul>
  <div class="nav-end"><a class="nav-icon active" href="mis_pedidos.php">Mis pedidos</a><button class="nav-cta" type="button">Carrito <span class="cart-count">0</span></button><button class="nav-ham" type="button" aria-label="Abrir menu" aria-controls="menu-mobile" aria-expanded="false">☰</button></div>
</nav>
<div class="mob" id="menu-mobile"><a href="ropa.html">Ropa</a><a href="accesorios.html">Accesorios</a><a href="kits.html">Kits</a><a href="temporada.html">Temporada</a><a href="contacto.html">Contacto</a><a href="mis_pedidos.php">Mis pedidos</a></div>

<main class="page-shell order-page">
  <section class="order-card">
    <span class="sec-tag">Cuenta</span>
    <h1>Mis pedidos</h1>
    <p>Consulta el pago y el avance de cada compra.</p>
  </section>

  <section class="order-card">
    <?php if (!$orders): ?>
      <p class="admin-muted">Todavia no tenes pedidos guardados.</p>
    <?php else: ?>
      <table class="admin-table">
        <thead><tr><th>Pedido</th><th>Pago</th><th>Estado</th><th>Total</th><th>Fecha</th></tr></thead>
        <tbody>
        <?php foreach ($orders as $order): ?>
          <tr>
            <td><a href="pedido.php?token=<?= e($order['public_token']) ?>">#<?= (int) $order['id'] ?></a></td>
            <td><?= e($order['payment_status']) ?></td>
            <td><?= e($order['fulfillment_status']) ?></td>
            <td>$<?= number_format((float) $order['total'], 0, ',', '.') ?></td>
            <td><?= e($order['created_at']) ?></td>
          </tr>
        <?php endforeach; ?>
        </tbody>
      </table>
    <?php endif; ?>
  </section>
</main>

<script src="js/vyntra_noir.js"></script>
<script src="js/vyntra_i18n.js"></script>
</body>
</html>
