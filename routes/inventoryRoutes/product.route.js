
const { Router } = require('express');
const { addProduct, getAllProducts,getAllProductsListWarehouseWise, getSingleProduct, updateProduct, deleteProduct, getSampleCSV, bulkUpdateProduct, bulkUploadProduct, getAllProductsByWarehouseId } = require("../../controllers/inventoryControllers/product");
const { verifyAdmin } = require('../../middlewares/inventoryMiddleware/checkUserRole');

//updatebulkproduct
//singleproductadd
//bulkproductupload
//productlist
//products

const productRouter = Router();
// ADD PRODUCT
productRouter.post("/add",verifyAdmin, addProduct)

// GET ALL PRODUCTS
productRouter.get("/getall", getAllProducts)

// GET ALL PRODUCTS BY WAREHOUSE WISE LIST
productRouter.get("/getall/warehouse", getAllProductsListWarehouseWise)

// GET ALL PRODUCTS BY WAREHOUSE ID
productRouter.get("/getall/warehouse/:id", getAllProductsByWarehouseId)

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

