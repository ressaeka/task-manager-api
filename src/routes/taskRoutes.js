import express from "express";
import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  softDeleteTask,
  restoreTask,
  deleteTask,
  getDeletedTask,
  setDeadlineTask,
  getTaskByDeadline,
  getTaskDeadlineToday
} from "../controllers/taskController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createTask);
router.get("/", authMiddleware, getTasks);
router.get("/deleted", authMiddleware, getDeletedTask);
router.put("/:id/deadline", authMiddleware, setDeadlineTask);
router.get("/deadline/upcoming", authMiddleware, getTaskByDeadline);
router.get("/deadline/today", authMiddleware, getTaskDeadlineToday);
router.get("/:id", authMiddleware, getTaskById);
router.put("/:id", authMiddleware, updateTask);
router.delete("/:id", authMiddleware, deleteTask);
router.delete("/:id/soft", authMiddleware, softDeleteTask);
router.post("/:id/restore", authMiddleware, restoreTask);

export default router;
