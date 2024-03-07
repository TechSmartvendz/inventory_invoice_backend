const mongoose = require("mongoose");
const { Schema } = mongoose;

const SupplierSchema = new Schema(
  {
    supplierName: {
      type: String,
      default: null,
      trim: true
    },
    supplierEmail: {
      type: String,
      default: null
    },
    supplierPhone: {
      type: Number,
      default: 0
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
    contactPerson: {
      type: String,
      default: null
    },
    gstNumber: {
      type: Number,
      default: 0
    },
    panNumber: {
      type: String,
      default: null
    },
    warehouse: {
      type: Schema.Types.ObjectId,
      ref: "warehouses",
      required: true
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "inventoryusers"
    },
    // admin: {
    //   type: String,
    //   default: null
    // },
    isDeleted: {
      type: Boolean,
      default: false
    },
  }, { timestamps: true });

const SupplierModel = mongoose.model("suppliers", SupplierSchema);

module.exports = { SupplierModel }

