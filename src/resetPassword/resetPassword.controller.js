const secretKey = process.env.JWT_SECRET; // Your JWT secret key
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const service = require("./resetRouter.service");

async function resetPassword(req, res) {
  try {
    const { token } = req.query;
    const { newPassword } = req.body.data;
      
    if (!token) {
      return res.status(400).json({ message: "Reset token is required" });
    }

    // Verify the JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await service.read(decoded.email);
    console.log(user);
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password in the database
    await service.update(user.user_id, hashedPassword);
    res.clearCookie("token"); 
    res.json({ message: "Password successfully reset. Please Login to view resources." });
  } catch (error) {
    console.error("Error resetting password:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = {
  resetPassword,
};