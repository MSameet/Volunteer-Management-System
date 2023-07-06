const { Schema, model } = require("mongoose");
const requestSchema = new Schema(
  {
    type: {
      type: String,
    },
    status: {
      type: String,
      enum: ["success", "reject", "pending"],
      default: "pending",
    },
    data: { type: Object },
  },
  {
    timeStamp: true,
  }
);

const Request = model("Request", requestSchema);
module.exports = Request;
