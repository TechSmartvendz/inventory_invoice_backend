const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const MachineSlotSchema = mongoose.Schema({
  machineId: {
    type: String,
    require: true,
  },
  machineName: {
    type: String,
    require: true,
  },
  slot: {
    type: String,
    require: true,
  },
  product: {
    type: String,
    require: true,
    default: null,
  },
  maxQuantity: {
    type: Number,
    require: true,
  },
  slotId: {
    type: String,
    require: true,
    default: generateslotId,
    unique: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
    required: true,
  },
  createdBy: {
    type: String,
    require: true,
    default: this.admin,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  admin: {
    type: String,
    required: true,
  },
  closingStock: {
    type: Number,
    default: 0,
    // max: maxquantity,
  },
  currentStock: { type: Number, default: 0, minimum: 0 },
  refillQuantity: { type: Number, default: 0 },
  saleQuantity: { type: Number, default: 0 },
}, { timestamps: true });

const MachineSlotModel = mongoose.model("machineSlots", MachineSlotSchema);

module.exports = { MachineSlotModel }
