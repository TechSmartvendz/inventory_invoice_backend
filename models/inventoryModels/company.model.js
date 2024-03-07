const {Schema,model} = require("mongoose");

const CompanySchema = Schema({
  // companyId: {
  //   type: String,
  //   require: true,
  //   unique: true,
  // },
  companyName: {
    type: String,
    require: true,
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
    country: {
      type: String,
      default: "N/A"
    },
    pincode: {
      type: Number,
      default: "N/A"
    },
  },
  phone: {
    type: String,
    default: "N/A"
  },
  email: {
    type: String,
    default: "N/A"
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "inventoryusers"
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  // admin: {
  //   type: String,
  //   required: true,
  // },
}, { timestapms: true });

const CompanyModel = model("companies", CompanySchema);

module.exports = { CompanyModel };

