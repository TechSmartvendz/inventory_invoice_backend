const mongoose = require("mongoose");
const { Schema } = mongoose;

const PurchaseStocksSchema = new Schema(
  {
    invoiceNumber: {
      type: String,
      // default: 0,
      unique: true,
      required: true
    },
    warehouse: {
      type: Schema.Types.ObjectId,
      ref: "warehouses",
      required: true
    },
    supplier: {
      type: Schema.Types.ObjectId,
      ref: "suppliers",
      required: true
    },
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "products",
          required: true
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
    GRNnumber: {
      type: Number,
      default: 0
    },
    purchaseDate: {
      type: Date,
      default: Date.now,
      required: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "inventoryusers",
      required: true
    },
    isDeleted: {
      type: Boolean,
      default: false
    },
  }, { timestamps: true, });

const PurchaseStocksModel = mongoose.model("purchaseStocks", PurchaseStocksSchema);

module.exports = { PurchaseStocksModel }

