const User = require("../models/User");

const userRegister = async (req, res) => {
  try {
    const userExist = await User.findOne({ email: req?.body?.email });

    if (userExist) {
      res
        .send({ error: "User is already existed, try another email address." })
        .status(504);
    }

    const user = new User(req.body);
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(402).send(error);
  }
};

// user login
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
        role: "volunteer",
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

// get top volunteer

const getTopVolunteer = async (req, res) => {
  try {
    const volunteers = await User.find({ rating: { $gt: 0 } })
      .sort({ rating: -1 })
      .limit(8);
    res.status(201).send({ volunteers });
  } catch (error) {
    res.status(404).send({ error });
  }
};

// update user

const updateUser = async (req, res) => {
  try {
    const { _id } = req.query;

    const user = await User.findByIdAndUpdate(
      _id,
      { $set: req.body },
      { new: true }
    );
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
};
// give rating
const updateRating = async (req, res) => {
  try {
    const { _id } = req.query;

    const update = await User.findByIdAndUpdate(
      _id,
      { $set: req.body },
      { new: true }
    );

    res.status(200).send({ message: "success" });
  } catch (error) {
    res.status(403).send(error);
  }
};
// getAllUser

const getAllUser = async (req, res) => {
  try {
    const { _id, page, pageSize } = req.query;

    const users = await User.find({ _id: { $nin: [_id] } })
      .sort({ createdAt: -1 })
      .limit(pageSize)
      .skip(page);

    res.status(201).send(users);
  } catch (error) {
    res.status(404).send(error);
  }
};

// deleteUser
const deleteUser = async (req, res) => {
  try {
    const { _id } = req.query;

    const user = await User.findByIdAndDelete(_id);
    res.status(201).send(user);
  } catch (error) {
    res.status(403).send(error);
  }
};

module.exports = {
  userLogin,
  userLogout,
  getVolunteers,
  volunteerRating,
  getTopVolunteer,
  updateUser,
  updateRating,
  userRegister,
  getAllUser,
  deleteUser,
};
