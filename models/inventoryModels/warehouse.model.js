const mongoose = require("mongoose");

const WarehouseSchema = new mongoose.Schema(
  {
    wareHouseName: {
      type: String,
      default: null
    },
    machine: {
      type: Schema.Types.ObjectId,
      ref: "machine"
    },
    email: {
      type: String,
      default: null
    },
    address: {
      area: {
        type: String,
        default: null
      },
      city: {
        type: String,
        default: null
      },
      state: {
        type: String,
        default: null
      },
      country: {
        type: String,
        default: null
      },
      pincode: {
        type: Number,
        default: null
      },
    }
    ,
    phoneNumber: {
      type: Number,
      default: null
    },
    contactPerson: {
      type: String,
      default: null
    },
    admin: {
      type: String,
      required: true
    },
    isDeleted: {
      type: Boolean,
      default: false
    },
  }, { timestamps: true });

const WarehouseModel = mongoose.model("warehouse", WarehouseSchema);

module.exports = { WarehouseModel }
