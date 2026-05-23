import {
  createAdminService,
  getAllUsersService,
  getAllTaskService,
  getDashboardStatsService,
  deleteUserService,
  softDeleteUserService,
  restoreUserService,
  getUserByUsernameService,
  getUserByIdService,
  getTaskByPublicIdService,
} from "../services/adminServices.js";

import { successResponse } from "../utils/response.js";
import { validateAdmin } from "../validators/authValidator.js";
import { validatePagination, validateRole, validateTaskQuery } from "../validators/queryValidator.js";
import { parseId } from "../utils/parseId.js";

// CREATE ADMIN
export const createAdmin = async (req, res, next) => {
  try {
    validateAdmin(req.body);
    await createAdminService(req.body);
    return successResponse(res, null, "Admin berhasil dibuat", 201);
  } catch (err) {
    return next(err);
  }
};

// GET USER BY USERNAME
export const getUserByUsername = async (req, res, next) => {
  try {
    const user = await getUserByUsernameService(req.params.username);
    return successResponse(res, { user }, "Berhasil mengambil user", 200);
  } catch (err) {
    return next(err);
  }
};

// GET USER BY ID
export const getUserById = async (req, res, next) => {
  try {
    const user = await getUserByIdService(parseId(req.params.id));
    return successResponse(res, { user }, "Berhasil mengambil user", 200);
  } catch (err) {
    return next(err);
  }
};

// GET ALL USERS
export const getAllUsers = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const { role, public_id, search } = req.query;

    validatePagination({ page, limit });
    validateRole(role);

    const result = await getAllUsersService(page, limit, role, public_id, search);

    let message = "Berhasil mengambil semua user";
    if (public_id) {
      message = `Berhasil mengambil user dengan public_id : ${public_id}`;
    }
    else if (role) {
      message = `Berhasil mengambil user dengan role: ${role}`;
    }
    else if (search) {
      message = `Berhasil mencari user dengan kata kunci: ${search}`;
    }

    return successResponse(res, result, message, 200);
  } catch (err) {
    return next(err);
  }
};

// GET ALL TASKS
export const getAllTask = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const { status, search, sort = "created_at", order = "desc" } = req.query;

    validatePagination({ page, limit });
    validateTaskQuery({ status, sort, order });

    const result = await getAllTaskService(page, limit, status, search, sort, order);
    return successResponse(res, result, "Berhasil mengambil semua task", 200);
  } catch (err) {
    return next(err);
  }
};

// GET TASK BY PUBLIC_ID
export const getTaskByPublicId = async (req, res, next) => {
  try {
    const task = await getTaskByPublicIdService(req.params.publicId);
    return successResponse(res, { task }, "Berhasil mengambil task", 200);
  } catch (err) {
    return next(err);
  }
};



// GET DASHBOARD STATS
export const getDashboardStats = async (req, res, next) => {
  try {
    const stats = await getDashboardStatsService();
    return successResponse(res, { stats }, "Berhasil mengambil dashboard stats", 200);
  } catch (err) {
    return next(err);
  }
};

// DELETE USER
export const deleteUser = async (req, res, next) => {
  try {
    await deleteUserService(parseId(req.params.id));
    return successResponse(res, null, "User berhasil dihapus", 200);
  } catch (err) {
    return next(err);
  }
};

// SOFT DELETE USER
export const softDeleteUser = async (req, res, next) => {
  try {
    await softDeleteUserService(parseId(req.params.id));
    return successResponse(res, null, "User berhasil dihapus (soft delete)", 200);
  } catch (err) {
    return next(err);
  }
};

// RESTORE USER
export const restoreUser = async (req, res, next) => {
  try {
    await restoreUserService(parseId(req.params.id));
    return successResponse(res, null, "User berhasil di restore", 200);
  } catch (err) {
    return next(err);
  }
};
