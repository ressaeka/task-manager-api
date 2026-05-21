import jwt from "jsonwebtoken";

const blacklistedTokens = new Map();

export const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

export const verifyToken = (token) => {
  if (blacklistedTokens.has(token)) {
    const err = new Error("Token sudah logout");
    err.name = "TokenExpiredError";
    throw err;
  }
  return jwt.verify(token, process.env.JWT_SECRET);
};

export const blacklistToken = (token) => {
  const decoded = jwt.decode(token);
  const exp = decoded?.exp ? decoded.exp * 1000 : Date.now() + 3600000;
  blacklistedTokens.set(token, exp);
};

// Bersihkan token yg sudah expired tiap 15 menit
setInterval(() => {
  const now = Date.now();
  for (const [token, exp] of blacklistedTokens) {
    if (exp <= now) { blacklistedTokens.delete(token); }
  }
}, 15 * 60 * 1000);

export const getBlacklistSize = () => blacklistedTokens.size;
