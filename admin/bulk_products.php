<?php
declare(strict_types=1);

require_once __DIR__ . '/../includes/admin_helpers.php';

require_admin();
$notice = '';
$errors = [];

function parse_product_rows(string $content): array
{
    $rows = [];
    foreach (preg_split('/\r\n|\r|\n/', trim($content)) as $line) {
        if (trim($line) === '') continue;
        $columns = str_getcsv($line);
        if (count($columns) < 5 || strtolower($columns[0]) === 'name') continue;
        $rows[] = [
            'name' => trim($columns[0]),
            'slug' => slugify($columns[1] ?: $columns[0]),
            'category' => trim($columns[2] ?: 'Ropa'),
            'description' => trim($columns[3] ?? ''),
            'price' => (float) str_replace(',', '.', $columns[4] ?? '0'),
            'stock' => (int) ($columns[5] ?? 0),
            'image_front' => trim($columns[6] ?? ''),
            'image_hover' => trim($columns[7] ?? ''),
            'status' => in_array($columns[8] ?? 'active', ['active', 'draft', 'archived'], true) ? $columns[8] : 'active',
        ];
    }
    return $rows;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $content = trim((string) ($_POST['bulk_products'] ?? ''));
    if (!empty($_FILES['csv_file']['tmp_name'])) {
        $content .= "\n" . (string) file_get_contents($_FILES['csv_file']['tmp_name']);
    }

    $rows = parse_product_rows($content);
    if (!$rows) {
        $errors[] = 'No se detectaron productos validos.';
    } else {
        $pdo = db();
        $stmt = $pdo->prepare('
            INSERT INTO products (name, slug, category, description, price, stock, image_front, image_hover, status)
            VALUES (:name, :slug, :category, :description, :price, :stock, :image_front, :image_hover, :status)
            ON DUPLICATE KEY UPDATE
              name = VALUES(name), category = VALUES(category), description = VALUES(description),
              price = VALUES(price), stock = VALUES(stock), image_front = VALUES(image_front),
              image_hover = VALUES(image_hover), status = VALUES(status)
        ');

        foreach ($rows as $row) {
            $stmt->execute($row);
        }
        $notice = count($rows) . ' productos cargados o actualizados.';
    }
}

admin_header('Carga masiva');
?>
<section class="admin-head">
  <div>
    <span class="sec-tag">Carga masiva</span>
    <h1>Agregar varios productos</h1>
    <p>Pega filas CSV o sube un archivo. Si el slug ya existe, se actualiza.</p>
  </div>
</section>

<?php if ($notice): ?><p class="admin-notice"><?= e($notice) ?></p><?php endif; ?>
<?php foreach ($errors as $error): ?><p class="admin-notice"><?= e($error) ?></p><?php endforeach; ?>

<form class="admin-form" method="post" enctype="multipart/form-data">
  <label>Archivo CSV<input type="file" name="csv_file" accept=".csv,text/csv"></label>
  <label>Productos CSV<textarea name="bulk_products" rows="10" placeholder="name,slug,category,description,price,stock,image_front,image_hover,status"></textarea></label>
  <p class="admin-muted">Formato: name, slug, category, description, price, stock, image_front, image_hover, status.</p>
  <button class="btn-outline-g" type="submit">Cargar productos</button>
</form>
<?php admin_footer(); ?>
