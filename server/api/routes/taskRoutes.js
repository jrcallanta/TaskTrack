import { Router, json } from "express";
const router = Router();
router.use(json());

import { getTasks, postTask, patchTask } from "../database/taskController.js";

router.get("/", getTasks);
router.post("/", postTask);
router.patch("/", patchTask);

export default router;
