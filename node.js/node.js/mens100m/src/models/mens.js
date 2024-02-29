const mongoose = require("mongoose");

const menShema = mongoose.Schema({
  ranking: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  dob: {
    type: Date,
    required: true,
    trim: true,
  },
  country: {
    type: String,
    required: true,
    trim: true,
  },
  score: {
    type: Number,
    required: true,
    trim: true,
  },
  event: {
    type: String,
    required: true,
    default: "100m",
  },
});

const MensRanking = new mongoose.model("MensRanking", menShema);

module.exports = MensRanking;
