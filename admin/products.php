<?php
declare(strict_types=1);

require_once __DIR__ . '/../includes/admin_helpers.php';

require_admin();
$pdo = db();
$notice = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $action = $_POST['action'] ?? '';

    if ($action === 'delete' && isset($_POST['delete_id'])) {
        $stmt = $pdo->prepare('DELETE FROM products WHERE id = ?');
        $stmt->execute([(int) $_POST['delete_id']]);
        $notice = 'Producto eliminado.';
    }

    if ($action === 'bulk_delete') {
        $ids = array_map('intval', $_POST['product_ids'] ?? []);
        $ids = array_values(array_filter($ids));
        if ($ids) {
            $placeholders = implode(',', array_fill(0, count($ids), '?'));
            $stmt = $pdo->prepare("DELETE FROM products WHERE id IN ($placeholders)");
            $stmt->execute($ids);
            $notice = count($ids) . ' productos eliminados.';
        }
    }
}

$products = $pdo->query('SELECT * FROM products ORDER BY created_at DESC, id DESC')->fetchAll();

admin_header('Productos');
?>
<section class="admin-head">
  <div>
    <span class="sec-tag">Catalogo</span>
    <h1>Productos</h1>
    <p>Editar, borrar o agregar piezas del catalogo administrable.</p>
  </div>
  <div class="admin-actions">
    <a class="btn-outline-g" href="bulk_products.php">Carga masiva</a>
    <a class="btn-outline-g" href="product_form.php">Agregar producto</a>
  </div>
</section>

<?php if ($notice): ?><p class="admin-notice"><?= e($notice) ?></p><?php endif; ?>

<form method="post" class="admin-card">
  <input type="hidden" name="action" value="">
  <div class="admin-table-actions">
    <strong><?= count($products) ?> productos</strong>
    <button class="admin-danger" type="submit" onclick="this.form.elements.action.value='bulk_delete'; return confirm('¿Borrar productos seleccionados?')">Borrar seleccionados</button>
  </div>
  <table class="admin-table">
    <thead><tr><th></th><th>Producto</th><th>Categoria</th><th>Precio</th><th>Stock</th><th>Estado</th><th>Acciones</th></tr></thead>
    <tbody>
    <?php foreach ($products as $product): ?>
      <tr>
        <td><input type="checkbox" name="product_ids[]" value="<?= (int) $product['id'] ?>"></td>
        <td class="admin-product-cell">
          <?php if ($product['image_front']): ?><img src="../<?= e($product['image_front']) ?>" alt=""><?php endif; ?>
          <div><strong><?= e($product['name']) ?></strong><small><?= e($product['slug']) ?></small></div>
        </td>
        <td><?= e($product['category']) ?></td>
        <td><?= money($product['price']) ?></td>
        <td><?= (int) $product['stock'] ?></td>
        <td><?= e($product['status']) ?></td>
        <td class="admin-row-actions">
          <a href="product_form.php?id=<?= (int) $product['id'] ?>">Editar</a>
          <button class="admin-link-danger" type="submit" name="delete_id" value="<?= (int) $product['id'] ?>" onclick="this.form.elements.action.value='delete'; return confirm('¿Borrar este producto?')">Borrar</button>
        </td>
      </tr>
    <?php endforeach; ?>
    </tbody>
  </table>
</form>
<?php admin_footer(); ?>
