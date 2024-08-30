const express = require("express");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
const signupRouter = require("./signup/signup.router");
const loginRouter = require("./login/login.router");
const verifyRouter = require("./verify/verify.router");
const forgotPasswordRouter = require("./forgotPassword/forgotPassword.router");
const resetPasswordRouter = require("./resetPassword/resetPassword.router");
const { restrictToLoggedinUserOnly } = require("./middleware/auth");

// Middleware

app.use(
  cors({
    origin: [
      "https://resturant-reservatation.onrender.com",
      "https://resturant-reservatation-system.onrender.com",
      "http://localhost:3000",
    ],
    credentials: true, // Allow credentials (cookies)
  })
);
app.use(cookieParser());
app.use(express.json());

app.use(express.urlencoded({ extended: false }));

// Routes

app.use("/signup", signupRouter);
app.use("/login", loginRouter);
app.use("/verify-token", verifyRouter);
app.use("/forgot-password", forgotPasswordRouter);
app.use("/reset-password", resetPasswordRouter);

app.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
  });
  res.status(200).send("Logged out");
});


// Home route
// http://localhost:5001/auth/cliendId/login
// http://localhost:5001/auth/cliendId/login
// http://localhost:5001/auth/cliendId/login

app.use(restrictToLoggedinUserOnly);

app.use("/home", (req, res) => {
  const name = "This is home";
  res.json({ data: name });
});


app.use("/about", (req, res) => {
  const name = "This is about";
  res.json({ data: name });
});

// 404 Error Handling Middleware
app.use((req, res, next) => {
  const error = new Error(`Path not found: ${req.originalUrl}`);
  error.status = 404;
  next(error);
});

// Error Handling Middleware
app.use((error, req, res, next) => {
  console.log(error);
  const { status = 500, message = "Something went wrong!" } = error;
  res.status(status).json({ error: message });
});

module.exports = app;
