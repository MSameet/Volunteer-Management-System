const Event = require("../models/Event");
const Request = require("../models/Request");
const User = require("../models/User");

// create user request

const userRequest = async (req, res) => {
  try {
    const request = new Request(req.body);
    await request.save();
    res.send(request).status(201);
  } catch (error) {
    res.status(404).send(error);
  }
};

// accept request for volunteering
const acceptVolunteeringRequest = async (req, res) => {
  try {
    const { _id } = req.query;
    const updateRequest = await Request.findByIdAndUpdate(
      _id,
      { $set: { status: "accept" } },
      { new: true }
    );
    const event = await Event.findByIdAndUpdate(
      { _id: updateRequest?.event },
      {
        $set: { volunteers: updateRequest?.sender },
      },
      { new: true }
    );

    res.status(201).send({ updateRequest });
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
    const request = await Request.find({ event: _id }).populate("sender");

    res.status(201).send(request);
  } catch (error) {
    res.status(404).send(error);
  }
};
// get user request
async function getUserRequest(req, res) {
  try {
    const { _id, page, pageSize } = req.query;
    const request = await Request.find({ sender: _id })
      .populate("event")
      .limit(pageSize)
      .skip(page);
    res.status(200).send(request);
  } catch (error) {
    res.status(400).send(error);
  }
}

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
  userRequest,
  acceptVolunteeringRequest,
  rejectVolunteeringRequest,
  getMyRequest,
  getUserRequest,
  getAllRequest,
};
