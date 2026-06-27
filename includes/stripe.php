<?php
declare(strict_types=1);

require_once __DIR__ . '/../config/stripe.php';

function stripe_amount(float|int|string $amount): int
{
    return (int) round(((float) $amount) * 100);
}

function stripe_request(string $method, string $path, array $params = []): array
{
    if (STRIPE_SECRET_KEY === '' || str_contains(STRIPE_SECRET_KEY, 'REEMPLAZAR')) {
        throw new RuntimeException('Configura STRIPE_SECRET_KEY en config/stripe.php.');
    }

    $ch = curl_init('https://api.stripe.com' . $path);
    $options = [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_USERPWD => STRIPE_SECRET_KEY . ':',
        CURLOPT_CUSTOMREQUEST => $method,
        CURLOPT_HTTPHEADER => ['Content-Type: application/x-www-form-urlencoded'],
    ];

    if ($params) {
        $options[CURLOPT_POSTFIELDS] = http_build_query($params);
    }

    curl_setopt_array($ch, $options);
    $body = curl_exec($ch);
    $status = (int) curl_getinfo($ch, CURLINFO_RESPONSE_CODE);
    $error = curl_error($ch);
    curl_close($ch);

    if ($body === false) {
        throw new RuntimeException('No se pudo conectar con Stripe: ' . $error);
    }

    $json = json_decode((string) $body, true);
    if (!is_array($json)) {
        throw new RuntimeException('Stripe respondio un formato invalido.');
    }

    if ($status >= 400) {
        $message = $json['error']['message'] ?? 'Error de Stripe.';
        throw new RuntimeException($message);
    }

    return $json;
}

function stripe_verify_signature(string $payload, string $signatureHeader): bool
{
    if (STRIPE_WEBHOOK_SECRET === '' || str_contains(STRIPE_WEBHOOK_SECRET, 'REEMPLAZAR')) {
        return false;
    }

    $timestamp = null;
    $signatures = [];
    foreach (explode(',', $signatureHeader) as $part) {
        [$key, $value] = array_pad(explode('=', $part, 2), 2, '');
        if ($key === 't') $timestamp = $value;
        if ($key === 'v1') $signatures[] = $value;
    }

    if (!$timestamp || !$signatures) {
        return false;
    }

    $signedPayload = $timestamp . '.' . $payload;
    $expected = hash_hmac('sha256', $signedPayload, STRIPE_WEBHOOK_SECRET);

    foreach ($signatures as $signature) {
        if (hash_equals($expected, $signature)) {
            return true;
        }
    }

    return false;
}
