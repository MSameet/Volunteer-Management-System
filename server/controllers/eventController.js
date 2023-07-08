const Event = require("../models/Event");
const User = require("../models/User");
const sharp = require("sharp");

const getEvents = async (req, res) => {
  try {
    const { page, pageSize } = req.query;
    const events = await Event.find({ organizer: req.user._id })
      .limit(pageSize)
      .skip(page)
      .populate("organizer");
    if (events) {
      res.status(200).send(events);
    }
  } catch (err) {
    res.send(err).status(404);
  }
};

// get single event

const singleEvent = async (req, res) => {
  try {
    const { _id } = req.query;
    const event = await Event.findById(_id).populate("volunteers");
    res.status(200).send(event);
  } catch (error) {
    res.status(403).send(error);
  }
};
const addEvent = async (req, res) => {
  try {
    const new_event = new Event({ ...req.body, organizer: req.user._id });
    await new_event.save();
    res.send(new_event).status(200);
  } catch (err) {
    res.send(err);
  }
};
const updateEvent = async (req, res) => {
  try {
    const { _id } = req.query;

    const event = await Event.findByIdAndUpdate(
      _id,
      { $set: req.body },
      { new: true }
    );
    res.send(event).status(200);
  } catch (err) {
    res.send(err);
  }
};

const deleteEvent = async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.send({ message: "Event deleted" });
  } catch (err) {
    res.status(404).send(err);
  }
};

const getAllEvents = async (req, res) => {
  try {
    const Events = await Event.find({})
      .populate("organizer")
      .sort({ createdAt: -1 });

    res.send(Events).status(200);
  } catch (error) {
    res.send().status(404);
  }
};

const addVolunteer = async (req, res) => {
  try {
    const { _id, volunteer } = req.body;

    const isVolunteer = await Event.findByIdAndUpdate(_id, {
      $addToSet: { volunteer },
    });
    res.send({ success: true }).status(200);
  } catch (error) {
    res.send().status(400);
  }
};

// get recent events

const getRecentEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ $natural: 1 }).limit(10);

    res.status(201).send({ events });
  } catch (error) {
    res.status(404).send();
  }
};

// update event status

const updateEventStatus = async (req, res) => {
  try {
    let { _id, status } = req.body;

    const event = await Event.findByIdAndUpdate(
      _id,
      { $set: { status } },
      { new: true }
    );

    res.status(201).send(event);
  } catch (error) {
    res.status(404).send(error);
  }
};

module.exports = {
  addEvent,
  getEvents,
  deleteEvent,
  updateEvent,
  getAllEvents,
  addVolunteer,
  getRecentEvents,
  updateEventStatus,
  singleEvent,
};
