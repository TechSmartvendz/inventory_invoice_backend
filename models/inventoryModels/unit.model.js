const mongoose = require("mongoose");

const UnitSchema = mongoose.Schema({
  unit: {
    type: String,
    require: true,
    unique: true
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

const UnitModel = mongoose.model("unit", UnitSchema);

module.exports = { UnitModel }



