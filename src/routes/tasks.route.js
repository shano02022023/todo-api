import { Router } from "express";
import { auth } from "../http/middleware/auth.js";
import { TaskController } from "../http/controllers/TasksController.js";
import { createTasksValidator } from "../http/validators/createTasks.js";
import { validate } from "../http/middleware/validateMiddleware.js";

const router = Router();

router.get("/", auth, TaskController.tasks);
router.get("/:id", auth, TaskController.view);
router.post("/", auth, createTasksValidator, validate, TaskController.create);
router.patch("/:id/complete", auth, TaskController.markAsCompleted);
router.delete("/:id", auth, TaskController.deleteTask);

export default router;

