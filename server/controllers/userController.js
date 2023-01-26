const User = require("../models/User");

const Events = require("../models/Event");
const Event = require("../models/Event");

const registerUser = async (req, res) => {
  try {
    const userExist = await User.findOne({ email: req.body.email });

    if (userExist) {
      res
        .send({ error: "User is already existed, try another email address." })
        .status(504);
    }

    const user = new User(req.body);
    await user.save();
    const token = await user.generateAuthToken();

    res.send({ user, token }).status(200);
  } catch (error) {
    res.send(error).status(404);
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findByCardentials(email, password);
    const token = await user.generateAuthToken();
    res.status(200).send({ user, token });
  } catch (error) {
    res.status().send(error);
  }
};
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(
      "🚀 ~ file: userController.js:31 ~ userLogin ~ req.body",
      req.body
    );

    const user = await User.findByCardentials(email, password);
    const token = await user.generateAuthToken();
    console.log("🚀 ~ file: userController.js:53 ~ adminLogin ~ token", user);
    res.status(200).send({ user, token });
  } catch (error) {
    res.status().send(error);
  }
};
const userLogout = async (req, res) => {
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
const getVolunteers = async (req, res) => {
  try {
    const volunteers = await User.find({ role: "Volunteer" });

    res.send(volunteers).status(200);
  } catch (error) {
    res.send().status(404);
  }
};
const volunteerRating = async (req, res) => {
  try {
    const volunteer = await User.findOneAndUpdate(
      {
        _id: req.params.id,
        role: "Volunteer",
      },
      { rating: req.body.rating }
    );
    if (volunteer) {
      res.send({ volunteer }).status(200);
    }
  } catch (error) {
    res.send().status(404);
  }
};

module.exports = {
  // getUserInEvent,
  // addUserInEvent,
  // getEventByUser,
  // deleteVolunteer,
  registerUser,
  userLogin,
  userLogout,
  getVolunteers,
  adminLogin,
  volunteerRating,
};
