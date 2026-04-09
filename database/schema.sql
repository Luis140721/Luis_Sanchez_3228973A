-- Base: CDAutoAlert — referencia al esquema real (no ejecutar si ya existe en pgAdmin)
-- API solo expone: cda, usuario_cda, vehiculo.

-- cda
-- cda_id, nit, razon_social, direccion, telefono_contacto, estado, created_at

-- usuario_cda
-- usuario_id, cda_id, nombre, email, password_hash, rol, estado, fecha_registro

-- vehiculo (verifica nombres exactos de las columnas fecha_vencimiento* en tu BD)
-- vehiculo_id, cliente_id, placa, marca, modelo,
-- fecha_vencimiento_soat, fecha_vencimiento_tecnomecanica  -- ajustar en vehiculo.controller.js si difieren
