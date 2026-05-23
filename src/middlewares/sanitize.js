const sanitizeString = (str) => {
  if (typeof str !== "string") {
    return str;
  }
  return str.trim();
};

const sanitizeObject = (obj) => {
  if (obj && typeof obj === "object") {
    for (const key of Object.keys(obj)) {
      if (typeof obj[key] === "string") {
        obj[key] = sanitizeString(obj[key]);
      } else if (obj[key] && typeof obj[key] === "object") {
        sanitizeObject(obj[key]);
      }
    }
  }
};

export const sanitizeInput = (req, res, next) => {
  if (req.body) { sanitizeObject(req.body); }
  if (req.query) { sanitizeObject(req.query); }
  if (req.params) { sanitizeObject(req.params); }

  next();
};
