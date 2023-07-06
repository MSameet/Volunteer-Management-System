const {
  acceptUserCreateRequest,
  createUserRequest,
  rejectUserRequest,
  acceptVolunteeringRequest,
  rejectVolunteeringRequest,
  getMyRequest,
  getAllRequest,
} = require("../controllers/requestController");

const router = require("express").Router();

// create user request
router.route("/create-user-request").post(createUserRequest);

// accept user request
router.route("/accept-user-create-request").post(acceptUserCreateRequest);

// reject user request
router.route("/reject-user-request").patch(rejectUserRequest);

// accept volunteer request
router.route("/accept-volunteer-request").post(acceptVolunteeringRequest);

// reject volunteer request
router.route("/reject-volunteer-request").post(rejectVolunteeringRequest);

// get request

router.route("/get-request").get(getMyRequest);

// get all new request

router.route("/get-all-request").get(getAllRequest);

module.exports = router;
