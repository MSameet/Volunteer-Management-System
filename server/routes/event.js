const router = require("express").Router();

const auth = require("../middleware/auth");

const {
  addEvent,
  getEvents,
  deleteEvent,
  updateEvent,
  getAllEvents,
} = require("../controllers/eventController");

router.post("/add-event", auth, addEvent);

router.get("/events", auth, getEvents);

router.get("/all-events", getAllEvents);

router.post("/events", auth, updateEvent);

router.delete("/:id", auth, deleteEvent);

module.exports = router;
