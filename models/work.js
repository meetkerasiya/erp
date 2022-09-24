const { number } = require("joi");
const mongoose = require("mongoose");
const workSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  details: {
    type: String,
    required: true,
  },
  client: {
    type: String,
    required: true,
  },
  cost: {
    type: String,
    required: true,
  },
  faculty_involved: {
    type: String,
    required: true,
  },
  is_deleted: {
    type: Boolean,
    required: false,
    default: false,
  },
});
const Work = mongoose.model("work", workSchema);

module.exports = Work;
