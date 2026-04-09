import { Router } from "express";
import {
  createVehiculo,
  deleteVehiculo,
  getVehiculo,
  getVehiculos,
  updateVehiculo,
} from "../controllers/vehiculo.controller.js";

const router = Router();

router.get("/vehiculo", getVehiculos);
router.get("/vehiculo/:vehiculoId", getVehiculo);
router.delete("/vehiculo/:vehiculoId", deleteVehiculo);
router.post("/vehiculo", createVehiculo);
router.patch("/vehiculo/:vehiculoId", updateVehiculo);

export default router;
