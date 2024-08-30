const router = require("express").Router();
const controller = require("./login.controller");

router.route("/").post(controller.login);

module.exports = router;
