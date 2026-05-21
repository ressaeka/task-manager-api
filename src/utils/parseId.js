import { AppError } from "./AppError.js";

export const parseId = (id) => {
  const parsed = Number(id);
  if (isNaN(parsed) || parsed <= 0) {
    throw new AppError("ID tidak valid", 400);
  }
  return parsed;
};
