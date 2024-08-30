const router = require("express").Router();

const controller = require("./resetPassword.controller");

router.route("/").post(controller.resetPassword);

module.exports = router;
