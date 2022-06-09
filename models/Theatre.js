const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//Create Schema
const TheatreSchema = new Schema({
  num_cnc: {
    type: Number,
    required: true
    },
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  post_code : {
      type: Number,
      required: true
  },
  number_of_rooms: {
    type: Number,
    required: true
  },
  town: {
    type: String,
    required: true
  }
});
module.exports = Theatre = mongoose.model("theatres", TheatreSchema);