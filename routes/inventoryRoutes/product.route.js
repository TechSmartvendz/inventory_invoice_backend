
const express = require('express');
const { addProduct, getAllProducts, getSingleProduct, updateProduct, deleteProduct, getSampleCSV, bulkUpdateProduct, bulkUploadProduct } = require("../../controllers/inventoryControllers/product");

//updatebulkproduct
//singleproductadd
//bulkproductupload
//productlist
//products

const productRouter = express.Router();
// ADD PRODUCT
productRouter.post("/add", addProduct)

// GET ALL PRODUCTS
productRouter.get("/getall", getAllProducts)

// GET SINGLE PRODUCT BY _id
productRouter.get("/single/:id", getSingleProduct)

// UPDATE PRODUCT DETAILS
productRouter.put("/update/:id", updateProduct)

// DELETE PRODUCT (soft delete)
productRouter.delete("/delete/:id", deleteProduct)

// SAMPLE PRODUCT CSV DOWNLOAD
productRouter.get("/samplecsv", getSampleCSV)

// PRODUCT BULK UPLOAD
productRouter.post("/bulkupload", bulkUploadProduct)

// PRODUCT BULK UPDATE
productRouter.put("/bulkUpdate", bulkUpdateProduct)

module.exports = { productRouter };

