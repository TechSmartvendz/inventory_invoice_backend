const { Schema, model } = require("mongoose");

const TransferReqWHtoWHSchema = new Schema(
  {
    fromWarehouse: {
      type: Schema.Types.ObjectId,
      ref: "warehouses",
    },
    toWarehouse: {
      type: Schema.Types.ObjectId,
      ref: "warehouses",
    },
    transferProducts: [
      {
        productName: {
          type: Schema.Types.ObjectId,
          ref: "products"
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
      default: "pending",
      enum: ["pending", "accepted", "rejected"],
    },
    isDeleted: {
      type: Boolean,
      default: false
    },
  }, { timestamps: true, });

const TransferReqWHtoWHModel =
  model("TransferRequestWHtoWHs", TransferReqWHtoWHSchema);

module.exports = { TransferReqWHtoWHModel };
