import { Router, json } from "express";
const api = Router();
api.use(json());

/* Import Routes */
import TaskRoutes from "./routes/taskRoutes.js";

/* Attach Routes */
api.use("/tasks", TaskRoutes);

export default api;
