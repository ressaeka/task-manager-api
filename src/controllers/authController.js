import { successResponse } from "../utils/response.js";
import { registerService, loginService, getUserProfileServices, changePasswordService, deleteOwnAccountService } from "../services/authServices.js";
import { validateAuth } from "../validators/authValidator.js";
import { blacklistToken } from "../utils/jwt.js";
import { AppError } from "../utils/AppError.js";

export const register = async (req, res, next) => {
  try {
    validateAuth(req.body);
    await registerService(req.body);
    return successResponse(res, null, "Register berhasil", 201);
  } catch (err) {
    return next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    validateAuth(req.body);
    const user = await loginService(req.body);
    return successResponse(res, user, "Login berhasil", 200);
  } catch (err) {
    return next(err);
  }
};

export const getProfile = async (req, res, next) => {
  try {
    const user = await getUserProfileServices(req.user.id);
    // eslint-disable-next-line no-unused-vars
    const { password, ...safeUser } = user;
    return successResponse(res, safeUser, "Berhasil mengambil profile");
  } catch (err) {
    return next(err);
  }
};

export const logout = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (token) {
      blacklistToken(token);
    }
    return successResponse(res, null, "Logout berhasil");
  } catch (err) {
    return next(err);
  }
};

export const changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
      throw new AppError("Current password dan new password wajib diisi", 400);
    }
    validateAuth({ username: "dummy", password: newPassword });
    await changePasswordService(req.user.id, { currentPassword, newPassword });
    return successResponse(res, null, "Password berhasil diubah");
  } catch (err) {
    return next(err);
  }
};

export const deleteAccount = async (req, res, next) => {
  try {
    await deleteOwnAccountService(req.user.id);
    return successResponse(res, null, "Akun berhasil dihapus");
  } catch (err) {
    return next(err);
  }
};
