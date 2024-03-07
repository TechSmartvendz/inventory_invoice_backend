const { Schema, model } = require("mongoose");;

const tdsSchema = new Schema({
    tdsName: {
        type: String,
        default: null,
        required: true,
        index: true
    },
    tdsRate: {
        type: Number,
        default: null,
        required: true,
        index: true,
    },
    section: {
        type: Schema.Types.ObjectId,
        ref: "inv_tdsTaxSection",
        index: true,
    },
    dummy: {
        type: String,
        default: "TDS"
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

const tdsModel = model("tds", tdsSchema);

module.exports = { tdsModel }