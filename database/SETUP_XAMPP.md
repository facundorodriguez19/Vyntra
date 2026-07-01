# VYNTRA - Base de datos local

1. Abrir XAMPP y activar Apache y MySQL.
2. Entrar a phpMyAdmin: `http://localhost/phpmyadmin`.
3. Ir a la pestaña `Importar`.
4. Seleccionar `database/schema.sql`.
5. Ejecutar la importación.

Si ya habias importado la base antes:

1. Importar `database/upgrade_admin.sql`.
2. Importar `database/upgrade_stripe.sql`.

La conexión usa la configuración por defecto de XAMPP:

- Host: `127.0.0.1`
- Base: `vyntra`
- Usuario: `root`
- Password: vacío

Si tu MySQL usa otros datos, cambiarlos en `config/database.php`.

## Admin

El primer usuario que se registre queda como administrador.

Panel:

`http://localhost/VYTRA/admin/`

Si ya tenias usuarios creados antes de agregar el panel, ejecutar en phpMyAdmin:

```sql
UPDATE users SET is_admin = 1 WHERE email = 'tu@email.com';
```

## WhatsApp

El boton flotante usa el numero definido en `config/site.php`.

Cambiar:

```php
const SITE_WHATSAPP_NUMBER = '5491112345678';
```

por tu numero en formato internacional, sin `+`, espacios ni guiones.

## Stripe

Configurar las claves en `config/stripe.php`:

```php
const STRIPE_SECRET_KEY = 'sk_test_...';
const STRIPE_WEBHOOK_SECRET = 'whsec_...';
const STRIPE_CURRENCY = 'ars';
```

En modo local, el Checkout puede volver a:

```text
http://localhost/VYTRA/pedido.php?session_id={CHECKOUT_SESSION_ID}
```

Webhook:

```text
http://localhost/VYTRA/api/stripe_webhook.php
```

Para probar webhooks en local con Stripe CLI:

```bash
stripe listen --forward-to http://localhost/VYTRA/api/stripe_webhook.php
```

Copiar el `whsec_...` que muestre Stripe CLI en `STRIPE_WEBHOOK_SECRET`.
