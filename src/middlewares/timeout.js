export const requestTimeout = (timeoutMs = 30000) => {
  return (req, res, next) => {
    res.setTimeout(timeoutMs, () => {
      res.status(408).json({
        status: "fail",
        message: "Request timeout",
      });
    });
    next();
  };
};
