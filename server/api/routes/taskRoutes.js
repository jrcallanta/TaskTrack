import { Router, json } from "express";
const router = Router();
router.use(json());

import { getTasks, postTask } from "../database/controller.js";

router.get("/", getTasks);
router.post("/", postTask);

export default router;
