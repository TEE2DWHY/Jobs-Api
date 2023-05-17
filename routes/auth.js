const router = require("express").Router();
const { login, register } = require("../controllers/auth");

//auth
router.route("/register").post(register);
router.route("/login").post(login);

module.exports = router;
