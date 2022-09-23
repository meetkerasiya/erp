//STTPs / Training Programs / Workshop / Expert Lectures were organized during above mentioned period
const { number } = require("joi");
const mongoose = require("mongoose");
const eventSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  type: {
    //Type( Seminar /Workshop / Conference / Webinar/ expert talk)

    type: String,
    required: true,
  },
  cordinator: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  start_date: {
    type: String,
    required: true,
  },
  end_date: {
    type: String,
    required: true,
  },
  no_of_participants: {
    type: Number,
    required: true,
  },
  sponsor: {
    type: [String],
  },
  for_whome: {
    //faculty or student
    type: String,
    required: true,
  },
  report: {
    type: String,
    //type: Blob,
    //required: true,
  },
  is_deleted: {
    type: Boolean,
    required: false,
    default: false,
  },
});
const Event = mongoose.model("event", eventSchema);

module.exports = Event;
