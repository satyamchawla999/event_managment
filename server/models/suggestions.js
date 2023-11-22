const mongoose = require("mongoose");

const suggestionSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Suggestion = mongoose.model("suggestion", suggestionSchema);

module.exports = Suggestion;
