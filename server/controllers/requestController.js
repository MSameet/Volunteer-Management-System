const Event = require("../models/Event");
const Request = require("../models/Request");
const User = require("../models/User");

// create user request

const createUserRequest = async (req, res) => {
  try {
    const { type, data } = req.body;
    const request = new Request({ type, data });
    await request.save();
    res.send(request).status(201);
  } catch (error) {
    res.status(404).send(error);
  }
};
// accept-user-create-request

const acceptUserCreateRequest = async (req, res) => {
  try {
    const { _id } = req.query;

    const updateRequest = await Request.findByIdAndUpdate(
      { _id },
      { $set: { status: "accept" } },
      { new: true }
    );
    const userExist = await User.findOne({ email: updateRequest?.data?.email });

    if (userExist) {
      res
        .send({ error: "User is already existed, try another email address." })
        .status(504);
    }

    const user = new User(updateRequest?.data);
    const token = await user.generateAuthToken();
    await user.save();
    res.send({ user, token }).status(200);
  } catch (error) {
    res.status(404).send(error);
  }
};

// reject user request
const rejectUserRequest = async (req, res) => {
  try {
    const { _id } = req.query;
    const updateRequest = await Request.findByIdAndUpdate(
      { _id },
      { $set: { status: "reject" } },
      { new: true }
    );
    res.status(201).send(updateRequest);
  } catch (error) {
    res.status(404).send(error);
  }
};

// accept request for volunteering
const acceptVolunteeringRequest = async (req, res) => {
  try {
    const { _id } = req.query;
    const updateRequest = await Request.findByIdAndUpdate(
      { _id },
      { $set: { status: "accept" } },
      { new: true }
    );
    const event = await Event.findByIdAndUpdate(
      { _id: updateRequest?.data?.event },
      {
        $set: { volunteers: updateRequest?.data?.volunteerID },
      },
      { new: true }
    );
    const volunteer = await User.findByIdAndUpdate(
      { _id: updateRequest?.data?.volunteerID },
      { $set: { events: updateRequest?.data?.event } },
      { new: true, upsert: true }
    );
    res.status(201).send({ event, volunteer });
  } catch (error) {
    res.status(404).send(error);
  }
};
// accept request for volunteering
const rejectVolunteeringRequest = async (req, res) => {
  try {
    const { _id } = req.query;
    const updateRequest = await Request.findByIdAndUpdate(
      { _id },
      { $set: { status: "reject" } },
      { new: true }
    );

    res.status(201).send(updateRequest);
  } catch (error) {
    res.status(401).send(error);
  }
};

// get request
const getMyRequest = async (req, res) => {
  try {
    const { _id } = req.query;
    const request = await Request.find({ "data.event": _id });
    res.status(201).send(request);
  } catch (error) {
    res.status(404).send(error);
  }
};

// get all request
const getAllRequest = async (req, res) => {
  try {
    const request = await Request.find({
      type: "signup",
    }).sort({
      createdAt: -1,
    });

    res.status(201).send(request);
  } catch (error) {
    res.status(404).send(error);
  }
};

module.exports = {
  acceptUserCreateRequest,
  createUserRequest,
  rejectUserRequest,
  acceptVolunteeringRequest,
  rejectVolunteeringRequest,
  getMyRequest,
  getAllRequest,
};
