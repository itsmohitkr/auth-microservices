
const router = require("express").Router();

const controller = require("./forgotPassword.controller");

router.route("/").post(controller.forgotPassword);

module.exports = router;