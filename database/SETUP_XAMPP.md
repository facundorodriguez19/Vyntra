# VYNTRA - Base de datos local

1. Abrir XAMPP y activar Apache y MySQL.
2. Entrar a phpMyAdmin: `http://localhost/phpmyadmin`.
3. Ir a la pestaña `Importar`.
4. Seleccionar `database/schema.sql`.
5. Ejecutar la importación.

La conexión usa la configuración por defecto de XAMPP:

- Host: `127.0.0.1`
- Base: `vyntra`
- Usuario: `root`
- Password: vacío

Si tu MySQL usa otros datos, cambiarlos en `config/database.php`.
