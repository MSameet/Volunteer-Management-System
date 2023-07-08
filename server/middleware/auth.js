const jswt = require("jsonwebtoken");
const User = require("../models/User");
const Organizer = require("../models/Organizer");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jswt.verify(token, "mvms");

    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });
    if (!user) {
      throw new Error();
    }

    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    res.send({ error: "Unable to authorize" }).status(404);
  }
};
const organizerAuth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jswt.verify(token, "mvms");

    const user = await Organizer.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });
    if (!user) {
      throw new Error("User is not exist.");
    }

    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    res.send({ error: "Unable to authorize" }).status(404);
  }
};

module.exports = { auth, organizerAuth };
