const express = require("express");
const {
    addCustomer,
    getCustomer,
    getCustomerById,
    updateCustomer,
    deleteCustomer,
} = require("../../controllers/invoiceControllers/customer");

const customerRouter = express.Router();

customerRouter.post("/add", addCustomer);
customerRouter.get("/get", getCustomer);
customerRouter.get("/getById", getCustomerById);
customerRouter.put("/update", updateCustomer);
customerRouter.put("/delete", deleteCustomer);

module.exports = { customerRouter };