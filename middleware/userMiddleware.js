const { verifyJWT } = require("../utils/userjwtverify");

exports.verifyUser = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Authorization token missing. Please log in." });
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = await verifyJWT(token);
    if (!decoded) {
      return res
        .status(401)
        .json({
          message: "Session expired or token invalid. Please log in again.",
        });
    }
    req.user = decoded;
    next();
  } catch (err) {
    console.error("JWT verification failed:", err.message);
    res
      .status(401)
      .json({ message: "Could not verify your session. Please try again." });
  }
};
