const { verifyToken } = require("../utils/jwt");

const authMiddleware = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Authorization required" });
  }

  const token = header.split(" ")[1];
  try {
    const payload = verifyToken(token);
    req.user = { id: payload.userId };
    return next();
  } catch (_error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = authMiddleware;
