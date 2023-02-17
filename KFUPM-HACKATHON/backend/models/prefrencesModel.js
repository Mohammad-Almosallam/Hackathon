const mongoose = require("mongoose");

const preferencesSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    responsibility: {
      type: String,
    },
    cleanliness: {
      type: String,
    },
    organization: {
      type: String,
    },
    communication: {
      type: String,
    },
    light: {
      type: String,
    },
    temperature: {
      type: String,
    },
    guests: {
      type: String,
    },
    study: {
      type: String,
    },
    conflictResolution: {
      type: String,
    },
    quietness: {
      type: String,
    },
    status:{
      type: String
    }
  },
  {
    timestamp: true,
  }
);

module.exports = mongoose.model("Preferences", preferencesSchema);
