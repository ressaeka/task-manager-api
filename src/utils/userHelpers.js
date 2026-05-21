import bcrypt from "bcrypt";
import { customAlphabet } from "nanoid";

const nanoid = customAlphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", 8);

export const hashPassword = (password) => bcrypt.hash(password, 8);

export const generatePublicId = () => nanoid();
