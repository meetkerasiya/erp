const { number } = require("joi");
const mongoose = require("mongoose");
const expertSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  faculty_name: {
    type: String,
    required: true,
  },
  title_talk: {
    type: String,
    required: true,
  },
  title_program: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  vanue: {
    type: String,
    required: true,
  },
  is_deleted: {
    type: Boolean,
    required: false,
    default: false,
  },
});
const Expert = mongoose.model("expert_talk", expertSchema);

module.exports = Expert;
