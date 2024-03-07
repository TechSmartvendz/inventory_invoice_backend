const { Schema, model } = require("mongoose");

const UnitSchema = Schema({
  unit: {
    type: String,
    require: true,
    unique: true
  },
  createdBy: {
    type: String,
  },
  // admin: {
  //   type: String,
  //   required: true,
  //   default: "null",
  // },
  isDeleted: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

const UnitModel = model("units", UnitSchema);

module.exports = { UnitModel }



