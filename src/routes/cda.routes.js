import { Router } from "express";
import {
  createCda,
  deleteCda,
  getCda,
  getCdas,
  updateCda,
} from "../controllers/cda.controller.js";
import { getUsuariosByCda } from "../controllers/usuario_cda.controller.js";

const router = Router();

router.get("/", getCdas);
router.get("/:cdaId/usuario_cda", getUsuariosByCda);
router.get("/:cdaId", getCda);
router.post("/", createCda);
router.patch("/:cdaId", updateCda);
router.delete("/:cdaId", deleteCda);

export default router;
