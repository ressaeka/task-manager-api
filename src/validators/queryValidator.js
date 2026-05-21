import { ValidationError } from "./ValidationError.js";

export const validatePagination = ({ page, limit }) => {
  if (isNaN(page) || page < 1){
    throw new ValidationError("Page minimal 1");
  }
  if (isNaN(limit) || limit < 1 || limit > 100) {
    throw new ValidationError("Limit minimal 1 dan maksimal 100");
  }
};

export const validateRole = (role) => {
  if (role && !["user", "admin"].includes(role)) {
    throw new ValidationError("Role harus 'user' atau 'admin'");
  }
};

const ALLOWED_SORT_COLUMNS = ["created_at", "title", "status", "deadline_at", "updated_at"];

export const validateTaskQuery = ({ status, sort, order }) => {
  if (status && !["pending", "in-progress", "done"].includes(status)) {
    throw new ValidationError("Status harus pending, in-progress, atau done");
  }
  if (sort && !ALLOWED_SORT_COLUMNS.includes(sort)) {
    throw new ValidationError(`Sort harus salah satu dari: ${ALLOWED_SORT_COLUMNS.join(", ")}`);
  }
  if (order && !["asc", "desc"].includes(order)) {
    throw new ValidationError("Order harus 'asc' atau 'desc'");
  }
};
