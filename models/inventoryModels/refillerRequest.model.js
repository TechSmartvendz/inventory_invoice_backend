const mongoose = require("mongoose");

const RefillrequestSchema = new Schema(
  {
    refillerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "inventoryusers",
      require: true,
    },
    warehouse: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "warehouse",
      required: true,
      index: true
    },
    refillRequestNumber: {
      type: String,
      default: null,
      unique: true,
      index: true
    },
    machineId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "machine",
      required: true,
      index: true
    },
    machineSlots: [
      {
        slot: {
          type: String,
          default: false
        },
        closingStock: {
          type: Number,
          default: 0
        },
        currentStock: {
          type: Number,
          default: 0
        },
        refillQuantity: {
          type: Number,
          default: 0
        },
        saleQuantity: {
          type: Number,
          default: 0
        },
        productid: {
          type: Schema.Types.ObjectId,
          ref: "product",
          index: true
        },
        sloteid: {
          type: String,
          default: false,
          index: true
        },
      },
    ],
    returnItems: [
      {
        slot: {
          type: String,
          default: false
        },
        closingStock: {
          type: Number,
          default: 0
        },
        currentStock: {
          type: Number,
          default: 0
        },
        refillQuantity: {
          type: Number,
          default: 0
        },
        saleQuantity: {
          type: Number,
          default: 0
        },
        productid: {
          type: Schema.Types.ObjectId,
          ref: "product",
          index: true
        },
        sloteid: {
          type: String,
          default: false,
          index: true
        },
      },
    ],
    date: {
      type: Date,
      default: null
    },
    sales: {
      cash: {
        type: Number,
        default: 0
      },
      totalSalesCount: {
        type: Number,
        default: 0
      },
      totalSalesValue: {
        type: Number,
        default: 0
      },
    },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"]
    },
    isDeleted: {
      type: Boolean,
      default: false
    },
  }, { timestamps: true });

const RefillrequestModel = mongoose.model("refillrequests", RefillrequestSchema);

module.exports = { RefillrequestModel }