const Organizer = require("../models/Organizer");

const organizerRegister = async (req, res) => {
  try {
    console.log("first");
    const userExist = await Organizer.findOne({ email: req?.body?.email });
    if (userExist) {
      res
        .send({
          error: "Organization is already existed, try another email address.",
        })
        .status(504);
    }

    const user = new Organizer(req.body);
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(402).send(error);
  }
};

// organizer login
const organizerLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Organizer.findByCardentials(email, password);
    const token = await user.generateAuthToken();
    res.status(200).send({ user, token });
  } catch (error) {
    res.status(401).send(error);
  }
};

const editOrganizer = async (req, res) => {
  try {
    const { _id } = req.query;
    const user = await Organizer.findByIdAndUpdate(
      _id,
      { $set: req.body },
      { new: true }
    );
    res.status(201).send(user);
  } catch (error) {
    res.status(404).send(error);
  }
};

// organizer logout
const organizerLogout = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(
      (token) => token.token !== req.token
    );
    await req.user.save();
    res.send();
  } catch (error) {
    res.send(501);
  }
};

// getAllOrganizer

const getAllOrganizer = async (req, res) => {
  try {
    const { page, pageSize } = req.query;
    const organizers = await Organizer.find().skip(page).limit(pageSize);
    res.status(200).send(organizers);
  } catch (error) {
    res.status(404).send(error);
  }
};

// deleteOrganizer

const deleteOrganizer = async (req, res) => {
  try {
    const { _id } = req.query;

    const user = await Organizer.findByIdAndDelete(_id);

    const event = await Event.findByIdAndDelete({ organizer: _id });
    res.status(201).send(user);
  } catch (error) {
    res.status(404).send(error);
  }
};

module.exports = {
  organizerRegister,
  organizerLogin,
  organizerLogout,
  getAllOrganizer,
  editOrganizer,
  deleteOrganizer,
};
