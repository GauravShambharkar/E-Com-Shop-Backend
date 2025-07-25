const jwt = require("jsonwebtoken");
const { JWT_USR_SECRET } = require("../config");

exports.verifyJWT = async (token) => {
  try {
    return await new Promise((resolve, reject) => {
      jwt.verify(token, JWT_USR_SECRET, (err, decoded) => {
        if (err) {
          console.error("JWT verification failed:", err.message);
          resolve(null);
        } else {
          resolve(decoded);
        }
      });
    });
  } catch (err) {
    console.error("JWT verification failed:", err.message);
    return null;
  }
};
