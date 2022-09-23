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
  no_of_students: {
    type: String,
    required: true,
  },
  is_deleted: {
    type: Boolean,
    required: false,
    default: false,
  },
});
const Tour = mongoose.model("study_tour", tour);

module.exports = Tour;
