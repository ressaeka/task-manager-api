import bcrypt from "bcrypt";
import { createUser, findUserByUsername, findUserById, updatePassword, softDeleteOwnAccount } from "../models/usersModel.js";
import { generateToken } from "../utils/jwt.js";
import { hashPassword, generatePublicId } from "../utils/userHelpers.js";
import { AppError } from "../utils/AppError.js";

// REGISTER
export const registerService = async ({ username, password }) => {
  const existingUser = await findUserByUsername(username);
  if (existingUser) {
    throw new AppError("User sudah terdaftar", 409);
  }

  return await createUser({
    publicId: generatePublicId(),
    username,
    password: await hashPassword(password),
    role: "user",
  });
};

// LOGIN
export const loginService = async ({ username, password }) => {
  const user = await findUserByUsername(username);
  const isMatch = user && (await bcrypt.compare(password, user.password));
  if (!isMatch) {
    throw new AppError("Username atau password salah", 401);
  }


  const token = generateToken({
    id: user.id,
    username: user.username,
    role: user.role,
  });

  return { token };
};

// GET USER PROFILE
export const getUserProfileServices = async (id) => {
  const user = await findUserById(id);
  if (!user){
    throw new AppError("User tidak ditemukan", 404);
  }
  return user;
};

// CHANGE PASSWORD
export const changePasswordService = async (userId, { currentPassword, newPassword }) => {
  const user = await findUserById(userId);
  if (!user) {
    throw new AppError("User tidak ditemukan", 404);
  }
  const isMatch = await bcrypt.compare(currentPassword, user.password);
  if (!isMatch) {
    throw new AppError("Password saat ini salah", 401);
  }
  const hashed = await hashPassword(newPassword);
  return await updatePassword(userId, hashed);
};

// DELETE OWN ACCOUNT (soft delete)
export const deleteOwnAccountService = async (userId) => {
  const user = await findUserById(userId);
  if (!user) {
    throw new AppError("User tidak ditemukan", 404);
  }
  if (user.deleted_at) {
    throw new AppError("Akun sudah dihapus", 400);
  }
  return await softDeleteOwnAccount(userId);
};
