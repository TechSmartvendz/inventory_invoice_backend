
const { Schema, model } = require("mongoose")
// const autoIncrement = require("mongoose-sequence")(mongoose);
const hsnCode = (code, taxId) => {
  return String(`${code}-${taxId}`);
}

const taxSchema = new Schema(
  {
    taxId: {
      type: Number
    },
    code: {
      type: Number,
      default: 0
    },
    hsn_Code: {
      type: String,
      default: hsnCode,
      unique: true
    },
    hsn_description: {
      type: String,
      default: null
    },
    cgst: {
      type: Number,
      default: 0
    },
    sgst: {
      type: Number,
      default: 0
    },
    igst: {
      type: Number,
      default: 0
    },
    cess: {
      type: Number,
      default: 0
    },
    dummy: {
      type: String,
      default: "Tax"
    },
    admin: {
      type: String,
      required: true
    },
    isDeleted: {
      type: Boolean,
      default: false
    },
  }, { timestamps: true, });




const TaxModel = model("taxs", taxSchema);

module.exports = { TaxModel }