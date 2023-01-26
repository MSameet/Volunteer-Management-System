const Event = require("../models/Event");
const User = require("../models/User");
const sharp = require("sharp");

const getEvents = async (req, res) => {
  try {
    if (req.user.role == "Admin") {
      const events = await Event.find({ owner: req.user._id });
      if (events) {
        res.status(200).send(events);
      } else {
        res.status(404).send({ message: "Event not found" });
      }
    } else {
      throw new Error("you are not an admin");
    }
  } catch (err) {
    res.send(err);
  }
};

const addEvent = async (req, res) => {
  const { title, description, banner } = req.body;
  console.log(
    "🚀 ~ file: eventController.js:24 ~ addEvent ~ req.body",
    req.body
  );

  try {
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
    const Events = await Event.find({});

    res.send(Events).status(200);
  } catch (error) {
    res.send().status(404);
  }
};

// exports.searchEvent = async (req, res) => {
//   try {
//     const event = await Event.find({ $text: { $search: req.params.text } });
//     res.json(event);
//   } catch (err) {
//     error(res, err);
//   }
// };

module.exports = {
  addEvent,
  getEvents,
  deleteEvent,
  updateEvent,
  getAllEvents,
};
