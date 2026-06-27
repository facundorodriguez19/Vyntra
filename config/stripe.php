<?php
declare(strict_types=1);

function env_value(string $name, string $fallback = ''): string
{
    $value = getenv($name);
    return $value === false ? $fallback : (string) $value;
}

define('STRIPE_SECRET_KEY', env_value('STRIPE_SECRET_KEY', 'sk_test_REEMPLAZAR'));
define('STRIPE_WEBHOOK_SECRET', env_value('STRIPE_WEBHOOK_SECRET', 'whsec_REEMPLAZAR'));
define('STRIPE_CURRENCY', strtolower(env_value('STRIPE_CURRENCY', 'ars')));
define('STRIPE_SUCCESS_URL', env_value('STRIPE_SUCCESS_URL', 'http://localhost/VYTRA/pedido.php?session_id={CHECKOUT_SESSION_ID}'));
define('STRIPE_CANCEL_URL', env_value('STRIPE_CANCEL_URL', 'http://localhost/VYTRA/index.html'));
