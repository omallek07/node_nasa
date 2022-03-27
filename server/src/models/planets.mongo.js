const mongoose = require("mongoose");

const planetsSchema = new mongoose.Schema({
  keplerName: {
    type: String,
    required: true,
  },
  isHabitable: {
    type: String,
    required: true,
    default: true,
  },
});

module.exports = mongoose.model("Planet", planetsSchema);
