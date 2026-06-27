<?php
declare(strict_types=1);

require_once __DIR__ . '/../includes/admin_helpers.php';

$admin = require_admin();
$pdo = db();
$today = date('Y-m-d');

$stats = [
    'products' => (int) $pdo->query('SELECT COUNT(*) FROM products')->fetchColumn(),
    'users' => (int) $pdo->query('SELECT COUNT(*) FROM users')->fetchColumn(),
    'orders' => (int) $pdo->query('SELECT COUNT(*) FROM orders')->fetchColumn(),
    'visits_today' => (int) $pdo->prepare('SELECT COUNT(*) FROM site_visits WHERE visited_date = ?')->execute([$today]),
];

$visitStmt = $pdo->prepare('SELECT COUNT(*) FROM site_visits WHERE visited_date = ?');
$visitStmt->execute([$today]);
$stats['visits_today'] = (int) $visitStmt->fetchColumn();

$salesTodayStmt = $pdo->prepare('SELECT COALESCE(SUM(total), 0) FROM orders WHERE DATE(created_at) = ?');
$salesTodayStmt->execute([$today]);
$salesToday = (float) $salesTodayStmt->fetchColumn();

$hourStmt = $pdo->prepare('
    SELECT visited_hour, COUNT(*) AS total
    FROM site_visits
    WHERE visited_date = ?
    GROUP BY visited_hour
    ORDER BY visited_hour
');
$hourStmt->execute([$today]);
$visitsByHour = $hourStmt->fetchAll();

$latestOrders = $pdo->query('SELECT id, customer_name, customer_email, total, status, created_at FROM orders ORDER BY created_at DESC LIMIT 6')->fetchAll();
$latestUsers = $pdo->query('SELECT id, name, email, is_admin, created_at FROM users ORDER BY created_at DESC LIMIT 6')->fetchAll();
$topPages = $pdo->prepare('
    SELECT path, COUNT(*) AS total
    FROM site_visits
    WHERE visited_date = ?
    GROUP BY path
    ORDER BY total DESC
    LIMIT 5
');
$topPages->execute([$today]);

admin_header('Dashboard');
?>
<section class="admin-head">
  <div>
    <span class="sec-tag">Panel privado</span>
    <h1>Dashboard</h1>
    <p>Resumen operativo de productos, personas, compras y visitas del dia.</p>
  </div>
  <a class="btn-outline-g" href="product_form.php">Agregar producto</a>
</section>

<section class="admin-stats">
  <article><span>Productos</span><strong><?= $stats['products'] ?></strong></article>
  <article><span>Personas</span><strong><?= $stats['users'] ?></strong></article>
  <article><span>Compras</span><strong><?= $stats['orders'] ?></strong></article>
  <article><span>Visitas hoy</span><strong><?= $stats['visits_today'] ?></strong></article>
  <article><span>Ventas hoy</span><strong><?= money($salesToday) ?></strong></article>
</section>

<section class="admin-grid">
  <article class="admin-card">
    <h2>Visitas por hora</h2>
    <div class="admin-bars">
      <?php if (!$visitsByHour): ?>
        <p class="admin-muted">Todavia no hay visitas registradas hoy.</p>
      <?php endif; ?>
      <?php foreach ($visitsByHour as $row): ?>
        <div class="admin-bar-row">
          <span><?= str_pad((string) $row['visited_hour'], 2, '0', STR_PAD_LEFT) ?>:00</span>
          <div><i style="width:<?= min(100, (int) $row['total'] * 12) ?>%"></i></div>
          <strong><?= (int) $row['total'] ?></strong>
        </div>
      <?php endforeach; ?>
    </div>
  </article>

  <article class="admin-card">
    <h2>Paginas mas vistas hoy</h2>
    <table class="admin-table">
      <tbody>
      <?php foreach ($topPages as $page): ?>
        <tr><td><?= e($page['path']) ?></td><td><?= (int) $page['total'] ?></td></tr>
      <?php endforeach; ?>
      </tbody>
    </table>
  </article>
</section>

<section class="admin-grid">
  <article class="admin-card">
    <h2>Ultimas compras</h2>
    <table class="admin-table">
      <thead><tr><th>Cliente</th><th>Total</th><th>Estado</th><th>Fecha</th></tr></thead>
      <tbody>
      <?php foreach ($latestOrders as $order): ?>
        <tr>
          <td><a href="orders.php?id=<?= (int) $order['id'] ?>"><?= e($order['customer_name']) ?></a><small><?= e($order['customer_email']) ?></small></td>
          <td><?= money($order['total']) ?></td>
          <td><?= e($order['status']) ?></td>
          <td><?= e($order['created_at']) ?></td>
        </tr>
      <?php endforeach; ?>
      </tbody>
    </table>
  </article>

  <article class="admin-card">
    <h2>Personas recientes</h2>
    <table class="admin-table">
      <thead><tr><th>Nombre</th><th>Email</th><th>Rol</th></tr></thead>
      <tbody>
      <?php foreach ($latestUsers as $user): ?>
        <tr><td><?= e($user['name']) ?></td><td><?= e($user['email']) ?></td><td><?= !empty($user['is_admin']) ? 'Admin' : 'Cliente' ?></td></tr>
      <?php endforeach; ?>
      </tbody>
    </table>
  </article>
</section>
<?php admin_footer(); ?>
