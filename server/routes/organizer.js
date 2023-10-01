const express = require("express");
const router = express.Router();
const { organizerAuth } = require("../middleware/auth");
const {
  organizerRegister,
  organizerLogin,
  organizerLogout,
  getAllOrganizer,
  editOrganizer,
  deleteOrganizer,
} = require("../controllers/organizerController");

router.route("/create-organiser").post(organizerRegister);

router.route("/organiser-login").post(organizerLogin);

router.route("/edit-organiser").patch(editOrganizer);

router.route("/logout").post(organizerAuth, organizerLogout);

router.route("/all-organizer").get(getAllOrganizer);

router.route("/delete-organizer").delete(deleteOrganizer);

module.exports = router;
