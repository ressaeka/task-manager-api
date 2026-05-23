import {
  findAllTaskPaginated,
  findAllUsersPaginated,
  countTotalUsers,
  countTotalTask,
  deleteUserById,
  countPendingTask,
  countInProgressTask,
  countCompletedTask,
  countNewUsersLast7Days,
  countActiveUsersToday,
  softDeleteUserById,
  restoreUserById,
  findTaskByPublicId
} from "../models/adminModel.js";
import { 
  findUserById as findUserByIdModel, 
  findUserByUsername as findUserByUsernameModel,  
  createUser 
} from "../models/usersModel.js";
import { hashPassword, generatePublicId } from "../utils/userHelpers.js";
import { AppError } from "../utils/AppError.js";

// CREATE ADMIN 
export const createAdminService = async (userData) => {
  const existingAdmin = await findUserByUsernameModel(userData.username);
  
  if (existingAdmin) {
    throw new AppError("Admin sudah terdaftar", 409);
  }

  const newAdmin = await createUser({
    publicId: generatePublicId(),
    username: userData.username,
    password: await hashPassword(userData.password),
    role: "admin",
  });
  
  return newAdmin;
};

// GET ALL USERS WITH PAGINATION
export const getAllUsersService = async (page = 1, limit = 10, role = null, public_id = null, search = null) => {
  const offset = (page - 1) * limit;

  const users = await findAllUsersPaginated(limit, offset, role, public_id, search);
  const total = await countTotalUsers(role, public_id, search);

  if (public_id && users.length === 0) {
    throw new AppError(`User dengan public_id : ${public_id} tidak ditemukan`, 404);
  }

  return {
    users,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      ...(role      && { filter: { role } }),
      ...(search    && { filter: { search } }),
      ...(public_id && { filter: { public_id } }),
    }
  };
};

// GET TASK WITH PAGINATION
export const getAllTaskService = async (page = 1, limit = 10, status = null, search=null, sort ='created_at', order = 'desc') => {
  const offset = (page - 1) * limit;

  const task = await findAllTaskPaginated(limit, offset, status, search, sort, order);
  const total = await countTotalTask(status, search);  

  return {
    task,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      ...(status && { filter: { status } }),
      ...(search && { filter: { search } }),
      sort: {by: sort, order: order} // menambahkan info sorting

    }
  };
};

// DASHBOARD STATS SERVICE 
export const getDashboardStatsService = async () => {
  const [
    totalRegularUsers,  
    totalAdmins,        
    totalTask,
    pendingTask,
    inProgressTask,
    completedTask,
    newUsersLast7Days,
    activeUsersToday
  ] = await Promise.all([
    countTotalUsers('user'),     
    countTotalUsers('admin'),  
    countTotalTask(),
    countPendingTask(),
    countInProgressTask(),
    countCompletedTask(),
    countNewUsersLast7Days(),
    countActiveUsersToday(),
  ]);

  const totalAccounts = totalRegularUsers + totalAdmins;

  const completionRate = totalTask > 0 
    ? Math.round((completedTask / totalTask) * 100) 
    : 0;

  return {
    totalUsers: totalRegularUsers, 
    totalAdmins: totalAdmins,       
    totalAccounts: totalAccounts,   
    totalTask,
    pendingTask,
    inProgressTask,
    completedTask,
    completionRate,
    newUsersLast7Days,
    activeUsersToday
  };
};

// GET USER BY USERNAME
export const getUserByUsernameService = async (username) => {
  const user = await findUserByUsernameModel(username);
  if (!user) {
    throw new AppError("User tidak ditemukan", 404);
  }
  return user;
};

// GET USER BY ID
export const getUserByIdService = async (userId) => {
  const user = await findUserByIdModel(userId);
  if (!user) {
    throw new AppError("User tidak ditemukan", 404);
  }
  return user;
};

// DELETE USER
export const deleteUserService = async (userId) => {
  const user = await findUserByIdModel(userId);
  if (!user) {
    throw new AppError("User tidak ditemukan", 404);
  }
  return await deleteUserById(userId);
};

// SOFT DELETE USER
export const softDeleteUserService = async (userId) => {
  const user = await findUserByIdModel(userId);
  if (!user) {
    throw new AppError("User tidak ditemukan", 404);
  }
  if (user.deleted_at) {
    throw new AppError("User sudah dihapus", 400);
  }
  return await softDeleteUserById(userId);
};

// RESTORE USER
export const restoreUserService = async (userId) => {
  const user = await findUserByIdModel(userId);
  if (!user) {
    throw new AppError("User tidak ditemukan", 404);
  }
  if (!user.deleted_at) {
    throw new AppError("User masih aktif, tidak perlu di restore", 400);
  }
  return await restoreUserById(userId);
};

// GET TASK BY PUBLIC_ID
export const getTaskByPublicIdService = async (publicId) => {
  const task = await findTaskByPublicId(publicId);
  if (!task) {
    throw new AppError("Task tidak ditemukan", 404);
  }
  return task;
};


