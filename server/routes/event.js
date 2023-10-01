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
  getHomeEvent,
  getAllData,
  getVolunteerEvents,
  findEventsByOrganizerAndYear,
} = require("../controllers/eventController");

router.post("/add-event", organizerAuth, addEvent);

router.get("/events", organizerAuth, getEvents);

router.get("/all-events", getAllEvents);

router.get("/single-event", singleEvent);

router.patch("/events", organizerAuth, updateEvent);

router.patch("/event-status", organizerAuth, updateEventStatus);

router.delete("/:id", organizerAuth, deleteEvent);

router.route("/add-volunteer").post(auth, addVolunteer);

router.route("/recent-events").get(getRecentEvents);

router.route("/get-home-data").get(getHomeEvent);

router.route("/getYearly-data").get(findEventsByOrganizerAndYear);

router.route("/get-alldata").get(getAllData);

router.route("/getEvent-volunteer").get(auth, getVolunteerEvents);

module.exports = router;
