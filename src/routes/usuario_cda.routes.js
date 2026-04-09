import { Router } from "express";
import {
  createUsuario,
  getUsuario,
  getUsuarios,
} from "../controllers/usuario_cda.controller.js";

const router = Router();

router.get("/usuario_cda", getUsuarios);
router.get("/usuario_cda/:usuarioId", getUsuario);
router.post("/usuario_cda", createUsuario);

export default router;
