const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const e = require("express");

const ProductSchema = mongoose.Schema({
  productId: {
    type: String,
    require: true,
    unique: true,
  },
  productName: {
    type: String,
    require: true,
    unique: true,
    trim: true
  },
  description: {
    type: String,
  },
  materialType: {
    type: String,
    require: true,
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
  },
  HSNcode: {
    type: String,
    require: true,
  },
  createdBy: {
    type: String,
    require: true,
    default: this.admin,
  },
  isDeleted: {
    type: Boolean,
    require: true,
    default: false,
  },
  admin: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const ProductModel = mongoose.model("product", ProductSchema);

module.exports = { ProductModel }

