const mongoose = require("mongoose");
const { Schema } = mongoose;

const WarehouseStockSchema = new Schema(
  {
    warehouse: {
      type: Schema.Types.ObjectId,
      ref: "warehouses",
      required: true
    },
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
    // admin: {
    //   type: String,
    //   default: null
    // },
    isDeleted: {
      type: Boolean,
      default: false
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: "inventoryusers"
    }
  }, { timestamps: true, });

const WarehouseModel = mongoose.model("warehouseStocks", WarehouseStockSchema);

module.exports = { WarehouseModel }

