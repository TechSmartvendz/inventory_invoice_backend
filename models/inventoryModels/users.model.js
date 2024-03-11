const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  userName: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
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
    default: "N/A"
  },
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
    pincode: {
      type: Number,
      default: "N/A"
    },
    country: {
      type: String,
      default: "N/A"
    },
  },
  profilePhoto: {
    type: String,
    // default: 'defaultProfileImg.jpg'
    default: "N/A"
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "inventoryusers",
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
  // admin: {
  //   type: String,
  //   required: true,
  // },
  warehouse: {
    type: Schema.Types.ObjectId,
    ref: "warehouses",
    default: null
  },
}, { timestamps: true });

const UserModel = model("inventoryusers", UserSchema)

module.exports = { UserModel }