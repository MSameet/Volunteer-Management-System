const Organizer = require("../models/Organizer");

const organizerRegister = async (req, res) => {
  try {
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
    res.status().send(error);
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

module.exports = { organizerRegister, organizerLogin, organizerLogout };
