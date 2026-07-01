<?php
declare(strict_types=1);

require_once __DIR__ . '/../includes/admin_helpers.php';

require_admin();
$pdo = db();
$id = isset($_GET['id']) ? (int) $_GET['id'] : null;
$product = [
    'name' => '',
    'slug' => '',
    'category' => 'Ropa',
    'description' => '',
    'price' => '0',
    'stock' => '0',
    'image_front' => '',
    'image_hover' => '',
    'status' => 'active',
];
$errors = [];

if ($id) {
    $stmt = $pdo->prepare('SELECT * FROM products WHERE id = ?');
    $stmt->execute([$id]);
    $product = $stmt->fetch() ?: $product;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = product_from_post();
    $product = array_merge($product, $data);

    if ($data['name'] === '') {
        $errors[] = 'El nombre es obligatorio.';
    }

    if (!$errors) {
        try {
            save_product($data, $id);
            redirect_to('products.php');
        } catch (Throwable $error) {
            $errors[] = 'No se pudo guardar. Revisá que el slug no exista en otro producto.';
        }
    }
}

admin_header($id ? 'Editar producto' : 'Agregar producto');
?>
<section class="admin-head">
  <div>
    <span class="sec-tag"><?= $id ? 'Editar' : 'Nuevo' ?></span>
    <h1><?= $id ? 'Editar producto' : 'Agregar producto' ?></h1>
    <p>Los productos guardados quedan disponibles para gestionarlos desde el panel.</p>
  </div>
</section>

<form class="admin-form" method="post">
  <?php foreach ($errors as $error): ?><p class="admin-notice"><?= e($error) ?></p><?php endforeach; ?>
  <label>Nombre<input name="name" value="<?= e((string) $product['name']) ?>" required></label>
  <label>Slug<input name="slug" value="<?= e((string) $product['slug']) ?>" placeholder="se genera si lo dejas vacio"></label>
  <label>Categoria<input name="category" value="<?= e((string) $product['category']) ?>"></label>
  <label>Descripcion<textarea name="description" rows="5"><?= e((string) $product['description']) ?></textarea></label>
  <div class="admin-form-grid">
    <label>Precio<input type="number" name="price" min="0" step="0.01" value="<?= e((string) $product['price']) ?>"></label>
    <label>Stock<input type="number" name="stock" min="0" value="<?= e((string) $product['stock']) ?>"></label>
    <label>Estado<select name="status"><option value="active" <?= $product['status'] === 'active' ? 'selected' : '' ?>>Activo</option><option value="draft" <?= $product['status'] === 'draft' ? 'selected' : '' ?>>Borrador</option><option value="archived" <?= $product['status'] === 'archived' ? 'selected' : '' ?>>Archivado</option></select></label>
  </div>
  <label>Imagen principal<input name="image_front" value="<?= e((string) $product['image_front']) ?>" placeholder="images/products/producto-front.jpg"></label>
  <label>Imagen hover<input name="image_hover" value="<?= e((string) $product['image_hover']) ?>" placeholder="images/products/producto-hover.jpg"></label>
  <div class="admin-actions">
    <button class="btn-outline-g" type="submit">Guardar</button>
    <a class="btn-ghost" href="products.php">Cancelar</a>
  </div>
</form>
<?php admin_footer(); ?>
