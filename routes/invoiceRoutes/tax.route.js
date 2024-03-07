const express = require("express");
const { addTax, getTax, getTaxById, updateTax, deleteTax } = require("../../controllers/invoiceControllers/tax");

const taxRouter = express.Router();

taxRouter.post("/add", addTax);
taxRouter.get("/get", getTax);
taxRouter.get("/getById", getTaxById);
taxRouter.put("/update", updateTax);
taxRouter.put("/delete", deleteTax);

module.exports = { taxRouter };