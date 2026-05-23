import {
  createTaskService,
  getTaskService,
  getTaskByIdService,
  updateTaskService,
  softDeleteTaskService,
  restoreTaskService,
  getDeletedTaskService,
  deleteTaskService,
  setDeadlineTaskService,
  getTaskByDeadlineService,
  getTaskDeadlineTodayService,
} from "../services/taskServices.js";
import { successResponse } from "../utils/response.js";
import { validateTask, validateUpdateTask, validateDeadline } from "../validators/taskValidator.js";
import { validatePagination, validateTaskQuery } from "../validators/queryValidator.js";
import { parseId } from "../utils/parseId.js";

// CREATE TASK
export const createTask = async (req, res, next) => {
  try {
    validateTask(req.body);
    const task = await createTaskService({
      title: req.body.title,
      description: req.body.description,
      deadline_at: req.body.deadline_at,
      userId: req.user.id,
    });
    return successResponse(res, { task }, "Task berhasil dibuat", 201);
  } catch (err) {
    return next(err);
  }
};

// GET TASKS
export const getTasks = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const { status, search, sort = "created_at", order = "desc" } = req.query;

    validatePagination({ page, limit });
    validateTaskQuery({ status, sort, order });

    const result = await getTaskService(req.user.id, page, limit, status, search, sort, order);
    return successResponse(res, result, "Berhasil mengambil task");
  } catch (err) {
    return next(err);
  }
};

// GET TASK BY ID
export const getTaskById = async (req, res, next) => {
  try {
    const task = await getTaskByIdService(parseId(req.params.id), req.user.id);
    return successResponse(res, { task }, "Berhasil mengambil detail task", 200);
  } catch (err) {
    return next(err);
  }
};

// UPDATE TASK
export const updateTask = async (req, res, next) => {
  try {
    validateUpdateTask(req.body);
    const task = await updateTaskService({
      taskId: parseId(req.params.id),
      userId: req.user.id,
      data: req.body,
    });
    return successResponse(res, { task }, "Task berhasil diupdate");
  } catch (err) {
    return next(err);
  }
};

// DELETE TASK
export const deleteTask = async (req, res, next) => {
  try {
    await deleteTaskService({ taskId: parseId(req.params.id), userId: req.user.id });
    return successResponse(res, null, "Task berhasil dihapus", 200);
  } catch (err) {
    return next(err);
  }
};

// SOFT DELETE TASK
export const softDeleteTask = async (req, res, next) => {
  try {
    await softDeleteTaskService(parseId(req.params.id), req.user.id);
    return successResponse(res, null, "Task berhasil dihapus", 200);
  } catch (err) {
    return next(err);
  }
};

// RESTORE TASK
export const restoreTask = async (req, res, next) => {
  try {
    await restoreTaskService(parseId(req.params.id), req.user.id);
    return successResponse(res, null, "Task berhasil direstore", 200);
  } catch (err) {
    return next(err);
  }
};

// GET DELETED TASKS
export const getDeletedTask = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    validatePagination({ page, limit });
    const result = await getDeletedTaskService(req.user.id, page, limit);
    return successResponse(res, result, "Berhasil mengambil task yang dihapus", 200);
  } catch (err) {
    return next(err);
  }
};

// SET DEADLINE
export const setDeadlineTask = async (req, res, next) => {
  try {
    validateDeadline(req.body);
    const task = await setDeadlineTaskService(parseId(req.params.id), req.user.id, req.body.deadline_at);
    return successResponse(res, { task }, "Deadline task berhasil diatur", 200);
  } catch (err) {
    return next(err);
  }
};

// GET TASKS BY DEADLINE
export const getTaskByDeadline = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    validatePagination({ page, limit });
    const result = await getTaskByDeadlineService(req.user.id, page, limit);
    const message = result.task.length === 0
      ? "Tidak ada task dengan deadline"
      : "Berhasil mengambil task berdasarkan deadline";
    return successResponse(res, result, message, 200);
  } catch (err) {
    return next(err);
  }
};

// GET TASKS DEADLINE TODAY
export const getTaskDeadlineToday = async (req, res, next) => {
  try {
    const task = await getTaskDeadlineTodayService(req.user.id);
    const message = task.length === 0
      ? "Tidak ada task dengan deadline hari ini"
      : "Berhasil mengambil task dengan deadline hari ini";
    return successResponse(res, { task }, message, 200);
  } catch (err) {
    return next(err);
  }
};
