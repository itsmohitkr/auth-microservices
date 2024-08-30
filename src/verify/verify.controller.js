const jwt = require("jsonwebtoken");
const secretKey = process.env.JWT_SECRET; // Your JWT secret key

function verify(req, res, next) {
  try {
    // Check if the token is provided in the cookies
    const token = req.cookies?.token;
    if (!token) {
      return next({
        status: 401,
        message: "Unauthorized: No token provided.",
      });
    }

    // Verify the token
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        // Handle specific JWT errors
        if (err.name === "TokenExpiredError") {
          return next({
            status: 401,
            message: "Unauthorized: Token has expired.",
          });
        } else if (err.name === "JsonWebTokenError") {
          return next({
            status: 401,
            message: "Unauthorized: Invalid token.",
          });
        } else {
          return next({
            status: 500,
            message:
              "An internal server error occurred during token verification.",
          });
        }
      }

      // If token is valid, return the decoded user info
      res.json({ user: decoded });
    });
  } catch (error) {
    // Handle any unexpected errors
    return next({
      status: 500,
      message: "An internal server error occurred. Please try again later.",
    });
  }
}

module.exports = {
  verify,
};
