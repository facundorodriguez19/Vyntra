<?php
declare(strict_types=1);

require_once __DIR__ . '/includes/auth.php';

$errors = [];
$name = '';
$email = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = trim((string) ($_POST['name'] ?? ''));
    $email = trim((string) ($_POST['email'] ?? ''));
    $password = (string) ($_POST['password'] ?? '');
    $passwordConfirm = (string) ($_POST['password_confirm'] ?? '');

    if (strlen($name) < 2 || strlen($name) > 80) {
        $errors[] = 'El nombre debe tener entre 2 y 80 caracteres.';
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = 'IngresÃ¡ un email vÃ¡lido.';
    }

    if (strlen($password) < 8) {
        $errors[] = 'La contraseÃ±a debe tener al menos 8 caracteres.';
    }

    if ($password !== $passwordConfirm) {
        $errors[] = 'Las contraseÃ±as no coinciden.';
    }

    if (!$errors) {
        try {
            $pdo = db();
            $stmt = $pdo->prepare('SELECT id FROM users WHERE email = :email LIMIT 1');
            $stmt->execute(['email' => $email]);

            if ($stmt->fetch()) {
                $errors[] = 'Ya existe una cuenta con ese email.';
            } else {
                $count = (int) $pdo->query('SELECT COUNT(*) FROM users')->fetchColumn();
                $insert = $pdo->prepare('INSERT INTO users (name, email, password_hash, is_admin) VALUES (:name, :email, :password_hash, :is_admin)');
                $insert->execute([
                    'name' => $name,
                    'email' => $email,
                    'password_hash' => password_hash($password, PASSWORD_DEFAULT),
                    'is_admin' => $count === 0 ? 1 : 0,
                ]);

                login_user([
                    'id' => (int) $pdo->lastInsertId(),
                    'name' => $name,
                    'email' => $email,
                    'is_admin' => $count === 0 ? 1 : 0,
                ]);
                redirect_to('index.html');
            }
        } catch (Throwable $error) {
            $errors[] = 'No se pudo conectar con la base de datos. ImportÃ¡ database/schema.sql en MySQL y revisÃ¡ config/database.php.';
        }
    }
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Registro - VYNTRA</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Playfair+Display:wght@600;700;800&display=swap" rel="stylesheet">
<link rel="stylesheet" href="css/vyntra_noir.css">
</head>
<body>
<nav>
  <a class="logo-wrap" href="index.html" aria-label="Inicio VYNTRA"><img class="logo-img" src="images/logoprincipaltexto.png" alt="VYNTRA"></a>
  <ul class="nav-center"><li><a href="ropa.html">Ropa</a></li><li><a href="accesorios.html">Accesorios</a></li><li><a href="kits.html">Kits</a></li><li><a href="temporada.html">Temporada</a></li><li><a href="contacto.html">Contacto</a></li></ul>
  <div class="nav-end"><a class="nav-login-button nav-auth-link" href="login.php" data-auth-login>Login</a><button class="nav-cta" type="button">Carrito <span class="cart-count">0</span></button><button class="nav-ham" type="button" aria-label="Abrir menu" aria-controls="menu-mobile" aria-expanded="false">â˜°</button></div>
</nav>
<div class="mob" id="menu-mobile"><a href="ropa.html">Ropa</a><a href="accesorios.html">Accesorios</a><a href="kits.html">Kits</a><a href="temporada.html">Temporada</a><a href="contacto.html">Contacto</a><a href="login.php" data-auth-login>Login</a></div>

<main>
  <section class="auth-shell">
    <div class="auth-copy">
      <span class="sec-tag">Registro VYNTRA</span>
      <h1>CreÃ¡ tu cuenta</h1>
      <p>El registro deja preparada la base para que el sitio pueda asociar pedidos, datos de contacto y futuras compras a cada usuario.</p>
    </div>

    <form class="auth-card" method="post" action="register.php" novalidate>
      <span class="sec-tag">Nueva cuenta</span>
      <h2>Datos de acceso</h2>

      <?php if ($errors): ?>
        <div class="auth-alert" role="alert">
          <?php foreach ($errors as $message): ?>
            <p><?= e($message) ?></p>
          <?php endforeach; ?>
        </div>
      <?php endif; ?>

      <label>Nombre<input type="text" name="name" value="<?= e($name) ?>" placeholder="Tu nombre" required></label>
      <label>Email<input type="email" name="email" value="<?= e($email) ?>" placeholder="tu@email.com" required></label>
      <label>ContraseÃ±a<input type="password" name="password" placeholder="MÃ­nimo 8 caracteres" minlength="8" required></label>
      <label>Confirmar contraseÃ±a<input type="password" name="password_confirm" placeholder="RepetÃ­ la contraseÃ±a" minlength="8" required></label>
      <button class="btn-outline-g" type="submit">Crear cuenta</button>
      <p class="auth-switch">Â¿Ya tenÃ©s cuenta? <a href="login.php">Ingresar</a></p>
    </form>
  </section>
</main>

<footer>
  <div class="foot-main">
    <div class="foot-brand"><span class="foot-brand-logo"><img src="images/logoprincipaltexto.png" alt="VYNTRA"></span><p class="foot-desc">Prendas y accesorios de autor para construir identidad con intenciÃ³n.</p></div>
    <nav class="foot-nav" aria-label="Secciones del sitio"><a href="index.html#sobre">Marca</a><a href="index.html#proceso">Proceso</a><a href="index.html#envios">EnvÃ­os</a><a href="index.html#contacto">Contacto</a></nav>
  </div>
  <div class="foot-bottom"><span class="foot-copy">Â© 2025 VYNTRA - Todos los derechos reservados</span><div class="foot-soc"><a href="ropa.html">Tienda</a><a href="temporada.html">Temporada</a></div></div>
</footer>
<script src="js/vyntra_noir.js"></script>
<script src="js/vyntra_i18n.js"></script>
</body>
</html>
