const { Schema, model } = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
    },
    country: {
      type: String,
    },
    city: {
      type: String,
    },
    role: {
      type: String,
      default: "Volunteer",
    },
    avatar: {
      type: String,
    },
    rating: {
      type: String,
      default: "0",
    },
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
  delete userObject.avatar;

  if (userObject.role == "admin") {
    delete userObject.rating;
  }
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
