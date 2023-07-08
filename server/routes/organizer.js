const express = require("express");
const router = express.Router();
const { organizerAuth } = require("../middleware/auth");
const {
  organizerRegister,
  organizerLogin,
  organizerLogout,
} = require("../controllers/organizerController");

router.route("/create-organiser").post(organizerRegister);

router.route("/organizer-login").post(organizerLogin);

router.route("/logout").post(organizerAuth, organizerLogout);

module.exports = router;
