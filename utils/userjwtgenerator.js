const jwt = require("jsonwebtoken");
const { JWT_USR_SECRET } = require("../config");

exports.generateJWT = async (user, expiresIn = "1d") => {
  try {
    return await new Promise((resolve, reject) => {
      jwt.sign(
        { id: user._id, email: user.email, role: user.role },
        JWT_USR_SECRET,
        { expiresIn },
        (err, token) => {
          if (err) reject(err);
          else resolve(token);
        }
      );
    });
  } catch (err) {
    console.error("JWT generation failed:", err.message);
    throw new Error("Could not generate authentication token.");
  }
};
