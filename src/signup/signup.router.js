

const router = require("express").Router();
const controller = require("./signup.controller");

router.route("/").post(controller.create);

module.exports = router;
