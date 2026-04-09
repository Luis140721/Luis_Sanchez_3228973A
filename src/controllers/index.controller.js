import { pool } from "../db.js";

export const index = (req, res) =>
  res.status(200).json({
    message: "CDAutoAlert API",
    tablas: ["cda", "usuario_cda", "vehiculo"],
    base: {
      cda: "/api/cda",
      cdaPorId: "/api/cda/:cdaId",
      usuario_cda: "/api/usuario_cda",
      usuarioPorId: "/api/usuario_cda/:usuarioId",
      usuariosPorCda: "/api/cda/:cdaId/usuario_cda",
      vehiculo: "/api/vehiculo",
      vehiculoPorId: "/api/vehiculo/:vehiculoId",
    },
  });

export const ping = async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT 'pong' AS result");
    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};
