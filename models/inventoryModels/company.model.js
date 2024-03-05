const mongoose = require("mongoose");

const CompanySchema = mongoose.Schema({
  companyId: {
    type: String,
    require: true,
    unique: true,
  },
  companyName: {
    type: String,
    require: true,
  },
  address: {
    type: String,
    require: true,
  },
  area: {
    type: String,
    require: true,
  },
  phone: {
    type: String,
  },
  email: {
    type: String,
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
}, { timestapms: true });

const CompanyModel = mongoose.model("companies", CompanySchema);

module.exports = { CompanyModel };

