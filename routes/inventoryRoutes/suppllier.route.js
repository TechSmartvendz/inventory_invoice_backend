const express = require("express");
const { addSupplier, getAllSuppliers, getSingleSupplier, updateSupplier, deleteSupplier} = require("../../controllers/inventoryControllers/supplier");


const supplierRouter = express.Router();
// add supplier
supplierRouter.post("/add", addSupplier)

// get all suppliers
supplierRouter.get("/getall", getAllSuppliers)

// get single supplier by _id
supplierRouter.get("/single/:id", getSingleSupplier)

// Update supplier Details
supplierRouter.put("/update/:id", updateSupplier)

// deletesupplier (soft delete)
supplierRouter.put("/delete/:id", deleteSupplier)


module.exports = { supplierRouter };
