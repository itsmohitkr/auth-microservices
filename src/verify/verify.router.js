const router = require("express").Router();
const controller = require("./verify.controller");

router.route("/").get(controller.verify);

module.exports = router;
