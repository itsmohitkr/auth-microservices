const bcrypt = require("bcrypt");

const { setUser } = require("../service/auth");
const service = require("./login.service");
const loginBodyData = ["email", "password"];

async function login(req, res, next) {
  try {
    const { email, password } = req.body.data;

    for (const key in req.body.data) {
      if (!loginBodyData.includes(key)) {
        return next({
          status: 400,
          message: `Invalid key: ${key}. Login body data should contain keys: email, password.`,
        });
      }
    }
    if (!email || !password) {
      return next({
        status: 4001,
        message: "Both email and password fields are required.",
      });
    }

    const user = await service.read(email);

    if (!user) {
      return next({
        status: 401,
        message: "User not found. Please register yourself.",
      });
    }
    if (user && (await bcrypt.compare(password, user.password)) === false) {
      return next({
        status: 401,
        message: "Incorrect password. Please try again.",
      });
    }

    const token = setUser(user);
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production" ? true : false, // Set to true in production
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax", // Required for cross-origin cookies
    });
    console.log(`user: ${user.full_name} logged in`);

    res.json({ data: user });
  } catch (error) {
    // Handle any unexpected errors
    return next({
      status: 500,
      message: "An internal server error occurred. Please try again later.",
    });
  }
}

module.exports = {
  login,
};
