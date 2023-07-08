const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");

const {
  userLogin,
  userLogout,
  getVolunteers,
  adminLogin,
  volunteerRating,
  getTopVolunteer,
  updateUser,
  updateRating,
  userRegister,
  getAllUser,
  deleteUser,
} = require("../controllers/userController");

router.post("/register", userRegister);

router.post("/login", userLogin);

router.get("/users/logout", auth, userLogout);
router.get("/volunteers", getVolunteers);
router.patch("/volunteer-rating/:id", volunteerRating);

router.get("/top-volunteers", getTopVolunteer);

router.route("/update-user").patch(updateUser);

router.route("/give-reward").patch(updateRating);

router.route("/all-users").get(getAllUser);

router.route("/users").delete(deleteUser);

// router.get("/event/me", auth, getEventByUser);
// router.get("/:id", auth, getUserInEvent);

// router.post("/:id", addUserInEvent);

// router.delete("/me", auth, deleteVolunteer);

module.exports = router;
