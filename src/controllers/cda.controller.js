import { pool } from "../db.js";

export const getCdas = async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM cda ORDER BY cda_id");
    res.status(200).json(rows);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const getCda = async (req, res) => {
  try {
    const { cdaId } = req.params;
    const { rows } = await pool.query("SELECT * FROM cda WHERE cda_id = $1", [
      cdaId,
    ]);

    if (rows.length <= 0) {
      return res.status(404).json({ message: "CDA no encontrado" });
    }

    res.status(200).json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const createCda = async (req, res) => {
  try {
    const { nit, razon_social, direccion, telefono_contacto, estado } =
      req.body;
    const { rows } = await pool.query(
      `INSERT INTO cda (nit, razon_social, direccion, telefono_contacto, estado)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [
        nit,
        razon_social ?? null,
        direccion ?? null,
        telefono_contacto ?? null,
        estado ?? true,
      ]
    );
    res.status(201).json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const updateCda = async (req, res) => {
  try {
    const { cdaId } = req.params;
    const { nit, razon_social, direccion, telefono_contacto, estado } =
      req.body;

    const { rowCount, rows } = await pool.query(
      `UPDATE cda SET
         nit = COALESCE($1, nit),
         razon_social = COALESCE($2, razon_social),
         direccion = COALESCE($3, direccion),
         telefono_contacto = COALESCE($4, telefono_contacto),
         estado = COALESCE($5, estado)
       WHERE cda_id = $6
       RETURNING *`,
      [
        nit ?? null,
        razon_social ?? null,
        direccion ?? null,
        telefono_contacto ?? null,
        estado ?? null,
        cdaId,
      ]
    );

    if (rowCount === 0) {
      return res.status(404).json({ message: "CDA no encontrado" });
    }

    res.status(200).json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const deleteCda = async (req, res) => {
  try {
    const { cdaId } = req.params;
    const { rowCount } = await pool.query("DELETE FROM cda WHERE cda_id = $1", [
      cdaId,
    ]);

    if (rowCount <= 0) {
      return res.status(404).json({ message: "CDA no encontrado" });
    }

    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};
