const { Schema, model } = require("mongoose");

const WarehouseSchema = new Schema(
  {
    wareHouseName: {
      type: String,
      required: true
    },
    // machine: {
    //   type: Schema.Types.ObjectId,
    //   ref: "machine"
    // },
    email: {
      type: String,
      default: "N/A"
    },
    address: {
      addressLineOne: {
        type: String,
        default: "N/A"
      },
      area: {
        type: String,
        default: "N/A"
      },
      city: {
        type: String,
        default: "N/A"
      },
      state: {
        type: String,
        default: "N/A"
      },
      country: {
        type: String,
        default: "N/A"
      },
      pincode: {
        type: Number,
        default: "N/A"
      },
    },
    phoneNumber: {
      type: Number,
      default: "N/A"
    },
    contactPerson: {
      type: String,
      default: "N/A"
    },
    // admin: {
    //   type: String,
    //   required: true
    // },
    isDeleted: {
      type: Boolean,
      default: false
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "inventoryusers"
    },
  }, { timestamps: true });

const WarehouseModel = model("warehouses", WarehouseSchema);

module.exports = { WarehouseModel }
