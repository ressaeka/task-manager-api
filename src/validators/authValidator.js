import { ValidationError } from "./ValidationError.js";

export const validateUsernamePassword = ({ username, password }) => {
  if (!username || !password) {
    throw new ValidationError("Username dan Password wajib diisi");
  }
  if (username.trim().length < 3) {
    throw new ValidationError("Username minimal 3 karakter");
  }
  if (password.length < 8) {
    throw new ValidationError("Password minimal 8 karakter");
  }
  if (!/[a-z]/.test(password)) {
    throw new ValidationError("Password harus mengandung huruf kecil");
  }
  if (!/[A-Z]/.test(password)) {
    throw new ValidationError("Password harus mengandung huruf besar");
  }
  if (!/\d/.test(password)) {
    throw new ValidationError("Password harus mengandung angka");
  }
};

export const validateAuth = validateUsernamePassword;
export const validateAdmin = validateUsernamePassword;
export const validateUser = validateUsernamePassword;
