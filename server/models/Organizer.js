const { Schema, model } = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const organizerSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    country: {
      type: String,
    },
    city: {
      type: String,
    },
    address: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    avatar: {
      type: String,
    },
    type: {
      type: String,
    },
    about: {
      type: String,
    },
    events: [{ event: { type: Schema.Types.ObjectId, ref: "Event" } }],
    tokens: [
      {
        token: {
          type: String,
        },
      },
    ],
  },
  {
    timeStamp: true,
  }
);

organizerSchema.methods.toJSON = function () {
  const user = this;

  const userObject = user.toObject();
  delete userObject.password;
  delete userObject.tokens;

  return userObject;
};

organizerSchema.statics.findByCardentials = async (email, password) => {
  const user = await Organizer.findOne({ email });
  if (!user) {
    throw new Error("Unable to login");
  }
  const isMatch = bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Unable to login");
  }
  return user;
};

organizerSchema.methods.generateAuthToken = async function () {
  const user = this;

  const token = jwt.sign({ _id: user._id.toString() }, "mvms");

  user.tokens = user.tokens.concat({ token });

  await user.save();
  return token;
};

organizerSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 10);
  }
  next();
});

const Organizer = model("Organizer", organizerSchema);
module.exports = Organizer;
