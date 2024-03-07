const express = require("express");
const {
    addPaymentTerm,
    getPaymentTerm,
    getPaymentTermById,
    updatePaymentTerm,
    deletePaymentTerm,
} = require("../../controllers/invoiceControllers/paymentTerm");

const paymentTermRouter = express.Router();

paymentTermRouter.post("/add", addPaymentTerm);
paymentTermRouter.get("/get", getPaymentTerm);
paymentTermRouter.get("/getById", getPaymentTermById);
paymentTermRouter.put("/update", updatePaymentTerm);
paymentTermRouter.put("/delete", deletePaymentTerm);

module.exports = { paymentTermRouter };