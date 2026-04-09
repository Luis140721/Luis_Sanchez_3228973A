import bcrypt from "bcryptjs";
import { pool } from "../db.js";

const USUARIO_LIST_FIELDS = `usuario_id, cda_id, nombre, email, rol, estado, fecha_registro`;

export const getUsuarios = async (req, res) => {
  try {
    const { rows } = await pool.query(
      `SELECT ${USUARIO_LIST_FIELDS} FROM usuario_cda ORDER BY usuario_id`
    );
    res.status(200).json(rows);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const getUsuariosByCda = async (req, res) => {
  try {
    const { cdaId } = req.params;
    const { rows } = await pool.query(
      `SELECT ${USUARIO_LIST_FIELDS} FROM usuario_cda WHERE cda_id = $1 ORDER BY usuario_id`,
      [cdaId]
    );
    res.status(200).json(rows);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const getUsuario = async (req, res) => {
  try {
    const { usuarioId } = req.params;
    const { rows } = await pool.query(
      `SELECT ${USUARIO_LIST_FIELDS} FROM usuario_cda WHERE usuario_id = $1`,
      [usuarioId]
    );

    if (rows.length <= 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.status(200).json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const createUsuario = async (req, res) => {
  try {
    const { cda_id, nombre, email, password, password_hash, rol, estado } =
      req.body;

    if (cda_id == null) {
      return res
        .status(400)
        .json({ message: "cda_id es obligatorio para vincular al CDA" });
    }

    let hash = password_hash;
    if (password != null && password !== "") {
      hash = await bcrypt.hash(password, 10);
    }

    if (!hash) {
      return res.status(400).json({
        message: "Indica password (se guardará hasheado) o password_hash",
      });
    }

    const { rows } = await pool.query(
      `INSERT INTO usuario_cda (cda_id, nombre, email, password_hash, rol, estado)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING ${USUARIO_LIST_FIELDS}`,
      [
        cda_id,
        nombre,
        email ?? null,
        hash,
        rol ?? null,
        estado ?? true,
      ]
    );
    res.status(201).json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};
