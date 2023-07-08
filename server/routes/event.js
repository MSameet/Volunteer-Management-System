const router = require("express").Router();

const { auth, organizerAuth } = require("../middleware/auth");

const {
  addEvent,
  getEvents,
  deleteEvent,
  updateEvent,
  getAllEvents,
  addVolunteer,
  getRecentEvents,
  updateEventStatus,
  singleEvent,
} = require("../controllers/eventController");

router.post("/add-event", organizerAuth, addEvent);

router.get("/events", organizerAuth, getEvents);

router.get("/all-events", getAllEvents);

router.get("/single-event", singleEvent);

router.patch("/events", auth, updateEvent);

router.patch("/event-status", auth, updateEventStatus);

router.delete("/:id", organizerAuth, deleteEvent);

router.route("/add-volunteer").post(auth, addVolunteer);

router.route("/recent-events").get(getRecentEvents);

module.exports = router;
