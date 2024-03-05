const mongoose = require("mongoose");

const TransferReqWHtoWHSchema = new mongoose.Schema(
  {
    fromWarehouse: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "warehouse",
    },
    toWarehouse: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "warehouse",
    },
    transferRequests: [
      {
        productName: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "product"
        },
        productQuantity: {
          type: Number,
          default: 0,
          minimum: 0
        },
      },
    ],
    status: {
      type: String,
      default: "Pending",
      enum: ["Pending", "Accepted", "Rejected"],
    },
    isDeleted: {
      type: Boolean,
      default: false
    },
  }, { timestamps: true, });

const TransferReqWHtoWHModel =
  mongoose.model("TransferRequestWHtoWHs", TransferReqWHtoWHSchema);

module.exports = { TransferReqWHtoWHModel };
