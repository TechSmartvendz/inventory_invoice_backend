const { Schema, model } = require("mongoose");

const MachineSlotSchema = Schema({
  slot: {
    type: String,
    require: true,
  },
  machine: {
    type: Schema.Types.ObjectId,
    ref: "machines"
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: "products"
  },
  maxQuantity: {
    type: Number,
    require: true,
  },
  // slotId: {
  //   type: String,
  //   require: true,
  //   default: generateslotId,
  //   unique: true,
  // },
  // isActive: {
  //   type: Boolean,
  //   default: false,
  // },
  // admin: {
  //   type: String,
  //   required: true,
  // },
  closingStock: {
    type: Number,
    default: 0,
    // max: maxquantity,
  },
  currentStock: {
    type: Number,
    default: 0,
    minimum: 0
  },
  refillQuantity: {
    type: Number,
    default: 0
  },
  saleQuantity: {
    type: Number,
    default: 0
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "inventoryusers"
  },
}, { timestamps: true });

const MachineSlotModel = model("machineSlots", MachineSlotSchema);

module.exports = { MachineSlotModel }
