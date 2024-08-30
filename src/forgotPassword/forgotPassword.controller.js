const secretKey = process.env.JWT_SECRET; // Your JWT secret key

const jwt = require("jsonwebtoken");
const service = require("../login/login.service");
const { sendResetEmail } = require("../service/emailService");


async function forgotPassword(req, res, next) {
  const { email } = req.body.data;

  const user = await service.read(email);
  if (!user) {
    return next({
      status: 404,
      message: "User not found",
    });
  }
  const payload = {
    id: user.id,
    email: user.email,
  };
    const resetToken = jwt.sign(payload, secretKey, { expiresIn: "1h" });
    sendResetEmail(user.email, resetToken);

    res.json({ message: "Password reset link sent to your email" });
}

module.exports = {
  forgotPassword,
};
