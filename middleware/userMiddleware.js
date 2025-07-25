const { verifyJWT } = require("../utils/userjwtverify");

exports.verifyUser = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = await verifyJWT(token);
    if (!decoded) {
      return res.status(401).json({ message: "Invalid token" });
    }
    req.user = decoded;
    next();
  } catch (err) {
    console.error("JWT verification failed:", err.message);
    res.status(401).json({ message: "Invalid token" });
  }
};
