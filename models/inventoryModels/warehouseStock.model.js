const mongoose = require("mongoose");
const { Schema } = mongoose;

const WarehouseStockSchema = new Schema(
  {
    warehouse: {
      type: Schema.Types.ObjectId,
      ref: "warehouse"
    },
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
    admin: {
      type: String,
      default: null
    },
    isDeleted: {
      type: Boolean,
      default: false
    },
  },
  {
    timestamps: true,
  }
);

const WarehouseModel = mongoose.model("warehouseStock", WarehouseStockSchema);

module.exports = { WarehouseModel }

