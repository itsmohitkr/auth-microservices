const bcrypt = require("bcrypt");
const service = require("./signup.service");
const signUpBodyData = ["full_name", "email", "password"];

async function create(req, res, next) {
  try {
    // Validate the request body keys
    const catchError = [];

    for (const key in req.body.data) {
      if (!signUpBodyData.includes(key)) {
        catchError.push(key);
      }
    }
    if (catchError.length > 0) {
      return next({
        status: 400,
        message: `Invalid key: ${catchError}. Signup body data should contain keys: full_name, email, password.`,
      });
    }

    const { full_name, email, password } = req.body.data;

    // Validate required fields are not empty
    if (!full_name || !email || !password) {
      return next({
        status: 400,
        message: "All input fields (full_name, email, password) are required.",
      });
    }

    // Check if the user already exists
    const user = await service.read(email);
    if (user) {
      return next({
        status: 400,
        message: "User already exists. Please try logging in.",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    const userData = await service.create(full_name, email, hashedPassword);

    // Respond with the created user data
    res.status(201).json({ data: userData });
  } catch (error) {
    return next({
      status: 500,
      message: "An internal server error occurred. Please try again later.",
    });
  }
}

module.exports = {
  create,
};
