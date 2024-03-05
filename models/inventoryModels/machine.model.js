const mongoose = require("mongoose");

const MachineSchema = mongoose.Schema({
  machineId: {
    type: String,
    require: true,
    unique: true,
  },
  machineName: {
    type: String,
    require: true,
    unique: true,
  },
  companyId: {
    type: String,
    require: true,
  },
  warehouse: {
    type: String,
    require: true,
  },
  refiller: {
    type: String,
    require: true,
  },
  building: {
    type: String,
    default: "N/A",
  },
  location: {
    type: String,
    default: "N/A",
  },
  productType: {
    type: String,
    default: "N/A",
  },
  totalSlots: {
    type: Number,
    default: 0,
    required: true,
  },
  remark: {
    type: String,
  },
  cash: {
    type: Number,
    default: 0,
  },
  totalSalesCount: {
    type: Number,
    default: 0,
  },
  totalSalesValue: {
    type: Number,
    default: 0,
  },
  created_by: {
    type: String,
    require: true,
    default: this.admin,
  },
  isDeleted: {
    type: Boolean,
    require: true,
    default: false,
  },
  admin: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const MachineModel = mongoose.model("machines", MachineSchema);

module.exports = { MachineModel }
