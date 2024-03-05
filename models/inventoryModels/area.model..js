const mongoose = require("mongoose");

const AreaSchema = mongoose.Schema({
  area: {
    type: String,
    require: true,
    unique: true
  },
  city: {
    type: String,
    require: true,
  },
  created_by: {
    type: String,
  },
  last_update: {
    type: Date,
  },
  admin: {
    type: String,
    required: true,
    default: "null",
  },
  delete_status: {
    type: Boolean,
    require: true,
    default: false
  }
}, { timestamps: true });

const AreaModel = mongoose.model("area", AreaSchema);

module.exports = { AreaModel }
