const { number } = require("joi");
const mongoose = require("mongoose");
const tour = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  place: {
    type: String,
    required: true,
  },
  no_of_student: {
    type: String,
    required: true,
  },
});
const Tour = mongoose.model("study_tour", tour);

module.exports = Tour;
