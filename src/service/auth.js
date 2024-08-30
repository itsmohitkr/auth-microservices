var jwt = require("jsonwebtoken");
const secretKey = process.env.JWT_SECRET; // Your JWT secret key


function setUser(user) {
  const payload = {
    id: user.user_id,
    email: user.email,
    full_name: user.full_name,
  };
  // lets put a stamp on token and return to the user
  return jwt.sign(payload, secretKey);
}

function getUser(token) {
  console.log(jwt.verify(token, secretKey));
  
  return jwt.verify(token, secretKey);
}

module.exports = {
  setUser,
  getUser,
};
