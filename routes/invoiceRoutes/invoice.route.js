const express = require("express");
const {
  addInvoice,
  getInvoice,
  getInvoiceById,
  updateInvoice,
  deleteInvoice,
  nextInvoiceNumber,
  getInvoicePayment,
  updateInvoicePayment
} = require("../../controllers/invoiceControllers/invoice");



const invoiceRouter = express.Router();
invoiceRouter.post("/add", addInvoice);
invoiceRouter.get("/get", getInvoice);
invoiceRouter.get("/getById", getInvoiceById);
invoiceRouter.put("/update", updateInvoice);
invoiceRouter.get("/nextInvoice", nextInvoiceNumber);
invoiceRouter.get("/getInvoicePayment", getInvoicePayment);
invoiceRouter.put("/updateInvoicePayment", updateInvoicePayment);

module.exports = { invoiceRouter };