const {
  userRequest,
  acceptVolunteeringRequest,
  rejectVolunteeringRequest,
  getMyRequest,
  getAllRequest,
  getUserRequest,
} = require("../controllers/requestController");

const router = require("express").Router();

// create user request
router.route("/create-user-request").post(userRequest);

// accept volunteer request
router.route("/accept-volunteer-request").post(acceptVolunteeringRequest);

// reject volunteer request
router.route("/reject-volunteer-request").post(rejectVolunteeringRequest);

// get request

router.route("/get-request").get(getMyRequest);

// get user request
router.route("/get-user-request").get(getUserRequest);

// get all new request

router.route("/get-all-request").get(getAllRequest);

module.exports = router;
