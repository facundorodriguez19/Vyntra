USE vyntra;

ALTER TABLE orders
  ADD COLUMN IF NOT EXISTS public_token VARCHAR(64) NULL AFTER user_id,
  ADD COLUMN IF NOT EXISTS currency CHAR(3) NOT NULL DEFAULT 'ars' AFTER total,
  ADD COLUMN IF NOT EXISTS payment_status ENUM('unpaid', 'paid', 'failed', 'refunded') NOT NULL DEFAULT 'unpaid' AFTER currency,
  ADD COLUMN IF NOT EXISTS fulfillment_status ENUM('received', 'preparing', 'packed', 'shipped', 'delivered', 'cancelled') NOT NULL DEFAULT 'received' AFTER payment_status,
  ADD COLUMN IF NOT EXISTS stripe_checkout_session_id VARCHAR(255) NULL AFTER fulfillment_status,
  ADD COLUMN IF NOT EXISTS stripe_payment_intent_id VARCHAR(255) NULL AFTER stripe_checkout_session_id,
  ADD COLUMN IF NOT EXISTS paid_at DATETIME NULL AFTER status,
  ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP AFTER created_at;

UPDATE orders SET public_token = CONCAT('legacy-', id) WHERE public_token IS NULL OR public_token = '';

ALTER TABLE orders
  MODIFY public_token VARCHAR(64) NOT NULL;

ALTER TABLE order_items
  ADD COLUMN IF NOT EXISTS product_slug VARCHAR(160) NULL AFTER product_id;
