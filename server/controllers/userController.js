const User = require("../models/User");
const mimetypes = require("mime-types");
const fs = require("fs");
const uuid = require("uuid");
const path = require("path");
const {
  euclideanDistance,
  manhattanDistance,
  encryptBiometrics,
  decryptBiometrics,
  getInitializationVector,
} = require("../utils");
const request = require("request").defaults({ encoding: null });

const userRegister = async (req, res) => {
  const { avatar, descriptor } = req.body;
  const userExist = await User.findOne({ email: req?.body?.email });

  if (userExist) {
    res
      .send({ error: "User is already existed, try another email address." })
      .status(504);
  }

  const mime = avatar.split(";")[0].split(":")[1];
  const ext = mimetypes.extension(mime);
  const path = "public/faces/" + uuid.v4() + "." + ext;
  fs.writeFile(path, avatar.split(",")[1], "base64", (e) => {
    if (e) {
      console.log(e);
      throw "Unable to save file.";
    }
  });
  const iv = getInitializationVector(16);

  const user = new User({
    ...req.body,
    init_vector: Buffer.from(iv, "binary").toString("base64"),
    face_descriptor: encryptBiometrics(descriptor, iv),
  });
  const token = await user.generateAuthToken();
  res.status(201).send({ user, token });
  // } catch (error) {
  //   res.status(402).send(error);
  // }
};

// user login
const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findByCardentials(email, password);
    const token = await user.generateAuthToken();
    res.status(200).send({ user, token });
  } catch (error) {
    res.status(401).send(error);
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
    const volunteers = await User.find({ role: "volunteer" });

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

// face recognition login

const faceRecognitionLogin = async (req, res) => {
  try {
    const { descriptor, screenshot } = req.body;
    const users = await User.find({});
    let threshold = 0.5;
    let bestMatchUser = {};
    users?.forEach((u) => {
      if (u.init_vector) {
        const iv = Buffer.from(u?.init_vector, "base64");
        const distance = euclideanDistance(
          descriptor,
          decryptBiometrics(u.face_descriptor, iv)
        );
        if (distance < threshold) {
          threshold = distance;
          bestMatchUser = u;
        }
      }
    });
    if (Object.keys(bestMatchUser).length === 0) {
      return res
        .status(400)
        .send(
          "It was not possible to associate the IMAGE inserted with the one registered. Insert a new image."
        );
    }
    const token = await bestMatchUser.generateAuthToken();
    res.status(200).send({ user: bestMatchUser, token });
  } catch (error) {
    res.status(401).send(error);
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
  faceRecognitionLogin,
};
