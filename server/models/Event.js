const { Schema, model } = require("mongoose");

const eventSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    detail: {
      type: String,
    },
    banner: {
      type: String,
    },
    type: {
      type: String,
    },
    duration: {
      type: String,
    },
    country: {
      type: String,
    },
    city: {
      type: String,
    },
    startDate: {
      type: String,
    },
    endDate: {
      type: String,
    },
    noOfAssignments: {
      type: String,
    },
    status: {
      type: String,
      default: "inactive",
    },
    organizer: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    volunteers: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);
const Event = model("Event", eventSchema);
module.exports = Event;
