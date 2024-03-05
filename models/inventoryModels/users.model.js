const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  mobileNumber: {
    type: Number,
  },
  email: {
    type: String,
  },
  address: {
    type: String,
  },
  country: {
    type: String,
  },
  state: {
    type: String,
  },
  city: {
    type: String,
  },
  area: {
    type: String,
  },
  profile_pic: {
    type: String,
    // default: 'defaultProfileImg.jpg'
  },
  createdBy: {
    type: String,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    require: true,
    enum: ["superAdmin", "admin", "refiller"],
  },
  password: {
    type: String,
    required: true,
  },
  admin: {
    type: String,
    required: true,
  },
}, { timestamps: true }
);

const UserModel = mongoose.model("inventoryusers", UserSchema)

module.exports = { UserModel }