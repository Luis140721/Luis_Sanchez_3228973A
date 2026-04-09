import express from "express";
import morgan from "morgan";

import cdaRoutes from "./routes/cda.routes.js";
import indexRoutes from "./routes/index.routes.js";
import usuarioCdaRoutes from "./routes/usuario_cda.routes.js";
import vehiculoRoutes from "./routes/vehiculo.routes.js";

const app = express();

app.use(morgan("dev"));
app.use(express.json());

app.use("/", indexRoutes);
app.use("/api/cda", cdaRoutes);
app.use("/api", usuarioCdaRoutes);
app.use("/api", vehiculoRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

export default app;
