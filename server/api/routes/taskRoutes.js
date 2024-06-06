import { Router, json } from "express";
const router = Router();
router.use(json());

import {
    getTasks,
    postTask,
    patchTask,
    deleteTask,
} from "../database/taskController.js";

router.get("/", getTasks);
router.post("/", postTask);
router.patch("/", patchTask);
router.delete("/:taskId", deleteTask);

export default router;
