<?php
declare(strict_types=1);

require_once __DIR__ . '/includes/auth.php';

$errors = [];
$email = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = trim((string) ($_POST['email'] ?? ''));
    $password = (string) ($_POST['password'] ?? '');

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = 'Ingresá un email válido.';
    }

    if ($password === '') {
        $errors[] = 'Ingresá tu contraseña.';
    }

    if (!$errors) {
        try {
            $stmt = db()->prepare('SELECT id, name, email, password_hash FROM users WHERE email = :email LIMIT 1');
            $stmt->execute(['email' => $email]);
            $user = $stmt->fetch();

            if (!$user || !password_verify($password, $user['password_hash'])) {
                $errors[] = 'El email o la contraseña no son correctos.';
            } else {
                login_user($user);
                redirect_to('index.html');
            }
        } catch (Throwable $error) {
            $errors[] = 'No se pudo conectar con la base de datos. Importá database/schema.sql en MySQL y revisá config/database.php.';
        }
    }
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Ingresar - VYNTRA</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Playfair+Display:wght@600;700;800&display=swap" rel="stylesheet">
<link rel="stylesheet" href="css/vyntra_noir.css">
</head>
<body>
<nav>
  <a class="logo-wrap" href="index.html" aria-label="Inicio VYNTRA"><img class="logo-img" src="images/logoprincipaltexto.png" alt="VYNTRA"></a>
  <ul class="nav-center"><li><a href="ropa.html">Ropa</a></li><li><a href="accesorios.html">Accesorios</a></li><li><a href="kits.html">Kits</a></li><li><a href="temporada.html">Temporada</a></li><li><a href="contacto.html">Contacto</a></li></ul>
  <div class="nav-end"><a class="nav-icon" href="temporada.html#lookbook">Lookbook</a><a class="nav-icon nav-auth-link active" href="login.php" data-auth-login>Ingresar</a><a class="nav-icon nav-auth-link" href="register.php" data-auth-register>Registro</a><button class="nav-cta" type="button">Carrito <span class="cart-count">0</span></button><button class="nav-ham" type="button" aria-label="Abrir menu" aria-controls="menu-mobile" aria-expanded="false">☰</button></div>
</nav>
<div class="mob" id="menu-mobile"><a href="ropa.html">Ropa</a><a href="accesorios.html">Accesorios</a><a href="kits.html">Kits</a><a href="temporada.html">Temporada</a><a href="contacto.html">Contacto</a><a href="login.php" data-auth-login>Ingresar</a><a href="register.php" data-auth-register>Registro</a></div>

<main>
  <section class="auth-shell">
    <div class="auth-copy">
      <span class="sec-tag">Acceso VYNTRA</span>
      <h1>Ingresá a tu cuenta</h1>
      <p>Usá tu cuenta para identificar pedidos, guardar datos de contacto y preparar el sitio para próximas funciones conectadas a la base de datos.</p>
    </div>

    <form class="auth-card" method="post" action="login.php" novalidate>
      <span class="sec-tag">Login</span>
      <h2>Bienvenido de nuevo</h2>

      <?php if ($errors): ?>
        <div class="auth-alert" role="alert">
          <?php foreach ($errors as $message): ?>
            <p><?= e($message) ?></p>
          <?php endforeach; ?>
        </div>
      <?php endif; ?>

      <label>Email<input type="email" name="email" value="<?= e($email) ?>" placeholder="tu@email.com" required></label>
      <label>Contraseña<input type="password" name="password" placeholder="Tu contraseña" required></label>
      <button class="btn-outline-g" type="submit">Ingresar</button>
      <p class="auth-switch">¿Todavía no tenés cuenta? <a href="register.php">Crear cuenta</a></p>
    </form>
  </section>
</main>

<footer>
  <div class="foot-main">
    <div class="foot-brand"><span class="foot-brand-logo"><img src="images/logoprincipaltexto.png" alt="VYNTRA"></span><p class="foot-desc">Prendas y accesorios de autor para construir identidad con intención.</p></div>
    <nav class="foot-nav" aria-label="Secciones del sitio"><a href="index.html#sobre">Marca</a><a href="index.html#lookbook">Lookbook</a><a href="index.html#proceso">Proceso</a><a href="index.html#envios">Envíos</a><a href="index.html#contacto">Contacto</a></nav>
  </div>
  <div class="foot-bottom"><span class="foot-copy">© 2025 VYNTRA - Todos los derechos reservados</span><div class="foot-soc"><a href="ropa.html">Tienda</a><a href="temporada.html">Temporada</a></div></div>
</footer>
<script src="js/vyntra_noir.js"></script>
</body>
</html>
