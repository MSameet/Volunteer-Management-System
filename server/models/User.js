const { Schema, model } = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const userSchema = new Schema(
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
    age: {
      type: String,
    },
    dob: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    role: {
      type: String,
      enum: ["admin", "volunteer", "organizer"],
      default: "volunteer",
      required: true,
    },
    avatar: {
      type: String,
    },
    rating: {
      type: String,
      default: "0",
    },
    type: {
      type: String,
    },
    qualification: {
      type: String,
    },
    skill: {
      type: String,
    },
    about: {
      type: String,
    },
    events: [{ type: Schema.Types.ObjectId, ref: "Event" }],
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

userSchema.methods.toJSON = function () {
  const user = this;

  const userObject = user.toObject();
  delete userObject.password;
  delete userObject.tokens;

  return userObject;
};

userSchema.statics.findByCardentials = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Unable to login");
  }
  const isMatch = bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Unable to login");
  }
  return user;
};

userSchema.methods.generateAuthToken = async function () {
  const user = this;

  const token = jwt.sign({ _id: user._id.toString() }, "mvms");

  user.tokens = user.tokens.concat({ token });

  await user.save();
  return token;
};

userSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 10);
  }
  next();
});

const User = model("User", userSchema);
module.exports = User;
