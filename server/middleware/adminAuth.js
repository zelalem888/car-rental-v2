const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
  try {
    const header = req.headers.authorization;

    if (!header) {
      return res.status(401).json({ message: "Unauthorized: No token" });
    }

    // Support both "Bearer token" or just "token"
    const token = header.startsWith("Bearer ") ? header.split(" ")[1] : header;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized: Token missing" });
    }

    jwt.verify(token, process.env.JWT_ADMIN_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ message: "Invalid token" });
      }

      req.user = user;
      next();
    });
  } catch (error) {
    console.error("Token verification error:", error);
    return res.status(500).json({ message: "Server error during token verification" });
  }
};
