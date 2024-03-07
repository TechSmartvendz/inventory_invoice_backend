const { Schema, model } = require("mongoose");

const MachineSchema = Schema({
  machineId: {
    type: String,
    require: true,
  },
  machineName: {
    type: String,
    require: true,
    unique: true,
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
    default: "N/A"
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
  isDeleted: {
    type: Boolean,
    require: true,
    default: false,
  },
  // admin: {
  //   type: String,
  //   required: true,
  // },
  warehouse: {
    type: Schema.Types.ObjectId,
    ref: "warehouses",
    default: "N/A"
  },
  refiller: {
    type: Schema.Types.ObjectId,
    ref: "inventoryusers",
  },
  company: {
    type: Schema.Types.ObjectId,
    ref: "companies",
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "inventoryusers",
  },
}, { timestamps: true });

const MachineModel = model("machines", MachineSchema);

module.exports = { MachineModel }
