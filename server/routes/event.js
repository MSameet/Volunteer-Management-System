const router = require("express").Router();

const auth = require("../middleware/auth");

const {
  addEvent,
  getEvents,
  deleteEvent,
  updateEvent,
  getAllEvents,
  addVolunteer,
  getRecentEvents,
} = require("../controllers/eventController");

router.post("/add-event", auth, addEvent);

router.get("/events", auth, getEvents);

router.get("/all-events", getAllEvents);

router.post("/events", auth, updateEvent);

router.delete("/:id", auth, deleteEvent);

router.route("/add-volunteer").post(auth, addVolunteer);

router.route("/recent-events").get(getRecentEvents);

module.exports = router;
