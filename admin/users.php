<?php
declare(strict_types=1);

require_once __DIR__ . '/../includes/admin_helpers.php';

require_admin();
$users = db()->query('
    SELECT u.id, u.name, u.email, u.is_admin, u.created_at,
           COUNT(o.id) AS orders_count,
           COALESCE(SUM(o.total), 0) AS total_spent
    FROM users u
    LEFT JOIN orders o ON o.user_id = u.id
    GROUP BY u.id
    ORDER BY u.created_at DESC
')->fetchAll();

admin_header('Personas');
?>
<section class="admin-head">
  <div>
    <span class="sec-tag">Clientes</span>
    <h1>Personas registradas</h1>
    <p>Datos de cuentas, compras realizadas y gasto acumulado.</p>
  </div>
</section>

<section class="admin-card">
  <table class="admin-table">
    <thead><tr><th>Nombre</th><th>Email</th><th>Rol</th><th>Compras</th><th>Total comprado</th><th>Alta</th></tr></thead>
    <tbody>
    <?php foreach ($users as $user): ?>
      <tr>
        <td><?= e($user['name']) ?></td>
        <td><?= e($user['email']) ?></td>
        <td><?= !empty($user['is_admin']) ? 'Admin' : 'Cliente' ?></td>
        <td><?= (int) $user['orders_count'] ?></td>
        <td><?= money($user['total_spent']) ?></td>
        <td><?= e($user['created_at']) ?></td>
      </tr>
    <?php endforeach; ?>
    </tbody>
  </table>
</section>
<?php admin_footer(); ?>
