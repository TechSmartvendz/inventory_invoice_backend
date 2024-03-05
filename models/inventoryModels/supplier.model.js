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
    supplierAddress: {
      type: String,
      default: null
    },
    contactPerson: {
      type: String,
      default: null
    },
    area: {
      type: String,
      default: null
    },
    state: {
      type: String,
      default: null
    },
    city: {
      type: String,
      default: null
    },
    country: {
      type: String,
      default: null
    },
    pincode: {
      type: Number,
      default: 0
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
      ref: "warehouse"
    },
    admin: {
      type: String,
      default: null
    },
    isDeleted: {
      type: Boolean,
      default: false
    },
  }, { timestamps: true });

const SupplierModel = mongoose.model("supplier", SupplierSchema);

module.exports = { SupplierModel }

