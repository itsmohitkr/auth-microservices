const { getUser } = require("../service/auth");

async function restrictToLoggedinUserOnly(req, res, next) {  
  const token = req.cookies?.token;
  if (!token) {
    return next({
      status: 401,
      message: "please login to view to this page."
    });
  };
  const user = getUser(token);

  if (!user) return res.redirect("/login");

  req.user = user; // attach that user to the request jo ja rha hai 
  next();
}
async function checkAuth(req, res, next) {
  const token = req.cookies?.token;

  const user = getUser(token);

  req.user = user;
  next();
}

module.exports = {
  restrictToLoggedinUserOnly,
  checkAuth,
};