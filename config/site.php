<?php
declare(strict_types=1);

const SITE_WHATSAPP_NUMBER = '5491112345678';
const SITE_WHATSAPP_MESSAGE = 'Hola VYNTRA, quiero hacer una consulta.';
const SITE_ORDER_EMAIL = 'facundo.rodriguez.pro@gmail.com';

function whatsapp_url(): string
{
    return 'https://wa.me/' . SITE_WHATSAPP_NUMBER . '?text=' . rawurlencode(SITE_WHATSAPP_MESSAGE);
}
