const Event = require("../models/Event");
const User = require("../models/User");
const sharp = require("sharp");

const getEvents = async (req, res) => {
  try {
    const events = await Event.find({ organizer: req.user._id }).populate(
      "organizer"
    );
    if (events) {
      res.status(200).send(events);
    }
  } catch (err) {
    res.send(err).status(404);
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
  const { title, description } = req.body;

  try {
    const banner = sharp(req.file.buffer)
      .resize({ width: 250, height: 250 })
      .png()
      .toBuffer();

    const new_event = new Event({
      title,
      description,
      banner,
      owner: req.user._id,
    });
    await new_event.save();
    res.send(new_event).status(200);
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

module.exports = {
  addEvent,
  getEvents,
  deleteEvent,
  updateEvent,
  getAllEvents,
  addVolunteer,
  getRecentEvents,
};
