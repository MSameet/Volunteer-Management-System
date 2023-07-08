const { Schema, model } = require("mongoose");
const requestSchema = new Schema(
  {
    sender: { type: Schema.Types.ObjectId, ref: "User" },
    event: { type: Schema.Types.ObjectId, ref: "Event" },
    status: {
      type: String,
      enum: ["success", "reject", "pending"],
      default: "pending",
    },
  },
  {
    timeStamp: true,
  }
);

const Request = model("Request", requestSchema);
module.exports = Request;
