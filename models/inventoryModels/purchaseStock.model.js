const mongoose = require("mongoose");
const { Schema } = mongoose;

const PurchaseStocksSchema = new Schema(
  {
    invoiceNumber: {
      type: String,
      default: 0
    },
    warehouse: {
      type: Schema.Types.ObjectId,
      ref: "warehouse",
    },
    supplier: {
      type: Schema.Types.ObjectId,
      ref: "supplier",
    },
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "product"
        },
        productQuantity: {
          type: Number,
          default: 0
        },
        sellingPrice: {
          type: Number,
          default: 0
        },
        totalPrice: {
          type: Number,
          default: 0
        },
        gst: {
          type: Schema.Types.ObjectId,
          ref: "m_gst"
        },
      },
    ],
    GRNNumber: {
      type: Number,
      default: 0
    },
    date: {
      type: Date,
      default: Date.now,
      required: true,
      index: true
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "inventoryusers",
    },
    isDeleted: {
      type: Boolean,
      default: false
    },
  }, { timestamps: true, });

const PurchaseStocksModel = mongoose.model("purchaseStocks", PurchaseStocksSchema);

module.exports = { PurchaseStocksModel }

