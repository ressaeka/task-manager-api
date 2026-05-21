import { ValidationError } from "./ValidationError.js";

export const validateTask = ({ title, description }) => {
  if (!title) {
    throw new ValidationError("title harus diisi");
  }
  if (title.length < 5) {
    throw new ValidationError("title minimal 5 karakter");
  }
  if (description && description.length > 255) {
    throw new ValidationError("description maksimal 255 karakter");
  }
};

export const validateUpdateTask = ({ title, description, status }) => {
  if (title !== undefined && title.trim() === "") {
    throw new ValidationError("title tidak boleh kosong");
  }
  if (description !== undefined && description.length > 255) {
    throw new ValidationError("description maksimal 255 karakter");
  }
  if (status !== undefined && !["pending", "in-progress", "done"].includes(status)) {
    throw new ValidationError("status harus 'pending', 'in-progress', atau 'done'");
  }
};

export const validateDeadline = ({ deadline_at }) => {
  if (!deadline_at) {
    throw new ValidationError("Deadline tidak boleh kosong");
  }
  if (isNaN(Date.parse(deadline_at))) {
    throw new ValidationError("Format deadline tidak valid. Gunakan YYYY-MM-DD atau ISO 8601");
  }
};
