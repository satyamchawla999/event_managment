const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },

    contact: {
      type: String,
      required: true,
    },

    hostName: {
      type: String,
      required: true,
    },

    clubName: {
      type: String,
      required: true,
    },

    eventName: {
      type: String,
      required: true,
    },

    eventPlace: {
      type: String,
      require: true,
    },

    eventDate: {
      type: Date,
      required: true,
    },

    seats: {
      type: String,
      required: true,
    },

    booked : [

    ]

  },
  {
    timestamps: true,
  }
);


const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
