const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const {
  getUserInEvent,
  addUserInEvent,
  deleteVolunteer,
  getEventByUser,
  registerUser,
  userLogin,
  userLogout,
  getVolunteers,
  adminLogin,
  volunteerRating,
  getTopVolunteer,
} = require("../controllers/userController");

// router.post("/register", registerUser);
router.post("/login", userLogin);

router.get("/users/logout", auth, userLogout);
router.get("/volunteers", getVolunteers);
router.patch("/volunteer-rating/:id", volunteerRating);

router.get("/top-volunteers", getTopVolunteer);

// router.get("/event/me", auth, getEventByUser);
// router.get("/:id", auth, getUserInEvent);

// router.post("/:id", addUserInEvent);

// router.delete("/me", auth, deleteVolunteer);

module.exports = router;
