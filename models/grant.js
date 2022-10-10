const { number } = require("joi");
const mongoose = require("mongoose");
const grantSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    requires: true,
  },
  cordinator: {
    type: String,
    required: true,
  },
  project_title: {
    type: String,
    required: true,
  },
  funding_agency: {
    type: [String],
    required: true,
  },
  amount: {
    type: String,
    required: true,
  },
  approval_letter: {
    type: String,
    required: false,
  },
  completion_letter: {
    type: String,
    required: false,
  },
  start_date: {
    type: String,
    required: ture,
  },
  end_date: {
    type: String,
    required: ture,
  },
  is_deleted: {
    type: Boolean,
    required: false,
    default: false,
  },
});
const Grant = mongoose.model("grant", grantSchema);

module.exports = Grant;
