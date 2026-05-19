const sanitizeString = (str) => {
  if (typeof str !== "string") {
    return str;
  }
  return str
    .trim()
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
};

export const sanitizeInput = (req, res, next) => {
  if (req.body && typeof req.body === "object") {
    for (const key of Object.keys(req.body)) {
      if (typeof req.body[key] === "string") {
        req.body[key] = sanitizeString(req.body[key]);
      }
    }
  }

  if (req.query && typeof req.query === "object") {
    for (const key of Object.keys(req.query)) {
      if (typeof req.query[key] === "string") {
        req.query[key] = sanitizeString(req.query[key]);
      }
    }
  }

  if (req.params && typeof req.params === "object") {
    for (const key of Object.keys(req.params)) {
      if (typeof req.params[key] === "string") {
        req.params[key] = sanitizeString(req.params[key]);
      }
    }
  }

  next();
};
