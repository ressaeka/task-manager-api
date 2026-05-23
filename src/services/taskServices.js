import {
  createTask,
  getTaskByUserIdPaginated,
  countTaskByUserId,
  findTaskById,
  updateTaskById,
  restoreTaskById,
  getDeleteTaskByUserId,
  countDeleteTaskByUserId,
  softDeleteTaskById,
  deleteTaskById,
  setDeadlineTask,
  getTaskByDeadline,
  getTaskDeadlineToday,
  countTaskWithDeadline,
} from "../models/taskModel.js";
import { generatePublicId } from "../utils/userHelpers.js";
import { AppError } from "../utils/AppError.js";

// CREATE TASK
export const createTaskService = async ({ title, description, deadline_at, userId }) => {
  return await createTask({
    publicId: generatePublicId(),
    title,
    description,
    deadline_at,
    userId,
  });
};

// GET TASKS WITH PAGINATION + FILTER
// GET TASKS WITH PAGINATION + FILTER + SORTING
export const getTaskService = async (userId, page = 1, limit = 10, status = null, search = null, sort = "created_at", order = "desc") => {
  const offset = (page - 1) * limit;
  
  const tasks = await getTaskByUserIdPaginated(userId, limit, offset, status, search, sort, order);
  const total = await countTaskByUserId(userId, status, search);

  return {
    tasks, 
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      ...(search && { search }),   
      ...(status && { status }),   
      sortBy: sort,               
      sortOrder: order,           
    },
  };
};
// GET TASK BY ID
export const getTaskByIdService = async (taskId, userId) => {
  const task = await findTaskById(taskId, userId);
  if (!task) {
    throw new AppError("Task tidak ditemukan", 404);
  }
  return task;
};

// UPDATE TASK
export const updateTaskService = async ({ taskId, userId, data }) => {
  const task = await findTaskById(taskId, userId);
  if (!task) {
    throw new AppError("Task tidak ditemukan", 404);
  }
  return await updateTaskById(taskId, userId, data);
};

// DELETE TASK
export const deleteTaskService = async ({ taskId, userId }) => {
  const task = await findTaskById(taskId, userId);
  if (!task) {
    throw new AppError("Task tidak ditemukan", 404);
  }
  await deleteTaskById(taskId, userId);
};

// SOFT DELETE TASK
export const softDeleteTaskService = async (taskId, userId) => {
  const task = await findTaskById(taskId, userId);
  if (!task) {
    throw new AppError("Task tidak ditemukan", 404);
  }
  if (task.deleted_at) {
    throw new AppError("Task sudah dihapus", 400);
  }
  return await softDeleteTaskById(taskId, userId);
};

// RESTORE TASK
export const restoreTaskService = async (taskId, userId) => {
  const task = await findTaskById(taskId, userId);
  if (!task) {
    throw new AppError("Task tidak ditemukan", 404);
  }
  if (!task.deleted_at) {
    throw new AppError("Task masih aktif, tidak perlu direstore", 400);
  }
  return await restoreTaskById(taskId, userId);
};

// GET DELETED TASKS WITH PAGINATION
export const getDeletedTaskService = async (userId, page = 1, limit = 10) => {
  const offset = (page - 1) * limit;
  const task = await getDeleteTaskByUserId(userId, limit, offset);
  const total = await countDeleteTaskByUserId(userId);

  return {
    task,
    pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
  };
};

// SET DEADLINE
export const setDeadlineTaskService = async (taskId, userId, deadline_at) => {
  const task = await findTaskById(taskId, userId);
  if (!task) {
    throw new AppError("Task tidak ditemukan", 404);
  }
  if (task.deleted_at) {
    throw new AppError("Task sudah dihapus", 400);
  }
  if (new Date(deadline_at) < new Date()) {
    throw new AppError("Deadline tidak boleh kurang dari hari ini", 400);
  }
  return await setDeadlineTask(taskId, userId, deadline_at);
};

// GET TASKS BY DEADLINE
export const getTaskByDeadlineService = async (userId, page = 1, limit = 10) => {
  const offset = (page - 1) * limit;
  const task = await getTaskByDeadline(userId, limit, offset);
  const total = await countTaskWithDeadline(userId);

  return {
    task,
    pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
  };
};

// GET TASKS DEADLINE TODAY
export const getTaskDeadlineTodayService = async (userId) => {
  return await getTaskDeadlineToday(userId);
};
