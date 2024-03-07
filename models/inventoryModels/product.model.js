const { Schema, model } = require("mongoose")

const ProductSchema = Schema({
  productId: {
    type: String,
    required: true,
    unique: true,
  },
  productName: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  description: {
    type: String,
    default: "N/A",
  },
  materialType: {
    type: String,
    required: true,
  },
  sellingPrice: {
    type: Number,
    default: 0,
  },
  mass: {
    type: String,
    default: "N/A",
  },
  unit: {
    type: String,
    default: "N/A",
  },
  remark: {
    type: String,
    default: "N/A",
  },
  HSNcode: {
    type: String,
    default: "N/A",
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "inventoryusers"
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
}, { timestamps: true });

const ProductModel = model("products", ProductSchema);

module.exports = { ProductModel }

