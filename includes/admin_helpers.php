<?php
declare(strict_types=1);

require_once __DIR__ . '/auth.php';

function money(float|int|string $value): string
{
    return '$' . number_format((float) $value, 0, ',', '.');
}

function admin_base_path(): string
{
    return str_contains($_SERVER['SCRIPT_NAME'] ?? '', '/admin/') ? '' : 'admin/';
}

function product_from_post(): array
{
    $name = trim((string) ($_POST['name'] ?? ''));
    $slug = trim((string) ($_POST['slug'] ?? ''));

    return [
        'name' => $name,
        'slug' => $slug !== '' ? slugify($slug) : slugify($name),
        'category' => trim((string) ($_POST['category'] ?? 'Ropa')),
        'description' => trim((string) ($_POST['description'] ?? '')),
        'price' => max(0, (float) str_replace(',', '.', (string) ($_POST['price'] ?? '0'))),
        'stock' => max(0, (int) ($_POST['stock'] ?? 0)),
        'image_front' => trim((string) ($_POST['image_front'] ?? '')),
        'image_hover' => trim((string) ($_POST['image_hover'] ?? '')),
        'status' => in_array($_POST['status'] ?? 'active', ['active', 'draft', 'archived'], true) ? $_POST['status'] : 'active',
    ];
}

function save_product(array $data, ?int $id = null): void
{
    if ($id) {
        $stmt = db()->prepare('
            UPDATE products
            SET name = :name, slug = :slug, category = :category, description = :description,
                price = :price, stock = :stock, image_front = :image_front, image_hover = :image_hover,
                status = :status
            WHERE id = :id
        ');
        $data['id'] = $id;
        $stmt->execute($data);
        return;
    }

    $stmt = db()->prepare('
        INSERT INTO products (name, slug, category, description, price, stock, image_front, image_hover, status)
        VALUES (:name, :slug, :category, :description, :price, :stock, :image_front, :image_hover, :status)
    ');
    $stmt->execute($data);
}

function admin_header(string $title): void
{
    $base = str_contains($_SERVER['SCRIPT_NAME'] ?? '', '/admin/') ? '../' : '';
    echo '<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">';
    echo '<title>' . e($title) . ' - Admin VYNTRA</title>';
    echo '<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Playfair+Display:wght@600;700;800&display=swap" rel="stylesheet">';
    echo '<link rel="stylesheet" href="' . $base . 'css/vyntra_noir.css"></head><body class="admin-body">';
    echo '<aside class="admin-sidebar"><a class="admin-logo" href="index.php">VYNTRA</a><nav>';
    echo '<a href="index.php">Dashboard</a><a href="products.php">Productos</a><a href="bulk_products.php">Carga masiva</a><a href="orders.php">Compras</a><a href="users.php">Personas</a><a href="../index.html">Ver sitio</a><a href="../logout.php">Salir</a>';
    echo '</nav></aside><main class="admin-main">';
}

function admin_footer(): void
{
    $base = str_contains($_SERVER['SCRIPT_NAME'] ?? '', '/admin/') ? '../' : '';
    echo '</main><script src="' . $base . 'js/vyntra_i18n.js"></script></body></html>';
}
