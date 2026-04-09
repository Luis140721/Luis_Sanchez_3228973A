import { pool } from "../db.js";

/**
 * Si en pgAdmin los nombres de las fechas no coinciden, cámbialos aquí.
 * (En la captura aparecían truncados como fecha_vencimient…)
 */
const COL_SOAT = "fecha_vencimiento_soat";
const COL_TECNO = "fecha_vencimiento_tecnomecanica";

export const getVehiculos = async (req, res) => {
  try {
    const { rows } = await pool.query(
      `SELECT * FROM vehiculo ORDER BY vehiculo_id`
    );
    res.status(200).json(rows);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};


export const getVehiculo = async (req, res) => {
  try {
    const { vehiculoId } = req.params;
    const { rows } = await pool.query(
      "SELECT * FROM vehiculo WHERE vehiculo_id = $1",
      [vehiculoId]
    );

    if (rows.length <= 0) {
      return res.status(404).json({ message: "Vehículo no encontrado" });
    }

    res.status(200).json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const deleteVehiculo = async (req, res) => {
  try {
    const { vehiculoId } = req.params;
    const { rowCount } = await pool.query(
      "DELETE FROM vehiculo WHERE vehiculo_id = $1",
      [vehiculoId]
    );

    if (rowCount <= 0) {
      return res.status(404).json({ message: "Vehículo no encontrado" });
    }

    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const createVehiculo = async (req, res) => {
  try {
    const {
      cliente_id,
      placa,
      marca,
      modelo,
      fecha_vencimiento_soat,
      fecha_vencimiento_tecnomecanica,
    } = req.body;

    const { rows } = await pool.query(
      `INSERT INTO vehiculo (cliente_id, placa, marca, modelo, ${COL_SOAT}, ${COL_TECNO})
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [
        cliente_id ?? null,
        placa,
        marca ?? null,
        modelo ?? null,
        fecha_vencimiento_soat ?? null,
        fecha_vencimiento_tecnomecanica ?? null,
      ]
    );
    res.status(201).json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const updateVehiculo = async (req, res) => {
  try {
    const { vehiculoId } = req.params;
    const {
      cliente_id,
      placa,
      marca,
      modelo,
      fecha_vencimiento_soat,
      fecha_vencimiento_tecnomecanica,
    } = req.body;

    const { rowCount, rows } = await pool.query(
      `UPDATE vehiculo SET
         cliente_id = COALESCE($1, cliente_id),
         placa = COALESCE($2, placa),
         marca = COALESCE($3, marca),
         modelo = COALESCE($4, modelo),
         ${COL_SOAT} = COALESCE($5, ${COL_SOAT}),
         ${COL_TECNO} = COALESCE($6, ${COL_TECNO})
       WHERE vehiculo_id = $7
       RETURNING *`,
      [
        cliente_id ?? null,
        placa ?? null,
        marca ?? null,
        modelo ?? null,
        fecha_vencimiento_soat ?? null,
        fecha_vencimiento_tecnomecanica ?? null,
        vehiculoId,
      ]
    );

    if (rowCount === 0) {
      return res.status(404).json({ message: "Vehículo no encontrado" });
    }

    res.status(200).json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};
