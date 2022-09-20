const { number, date } = require("joi");
const mongoose = require("mongoose");
const phdSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  date_of_completion: {
    type: String,
    required: true,
  },
  institute: {
    type: String,
    required: true,
  },
});
const Phd = mongoose.model("phd", phdSchema);

module.exports = Phd;
