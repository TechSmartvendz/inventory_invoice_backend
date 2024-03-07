const express = require("express");
const { createProduct,getAllProducts, getProductById, updateProduct, deleteProduct, bulkupload, exportProduct } = require("../../controllers/invoiceControllers/product");


const productRouter = express.Router();

productRouter.post("/create", createProduct);
productRouter.get("/getall", getAllProducts);
productRouter.get("/single/:id", getProductById);
productRouter.put("/update", updateProduct);
productRouter.delete("/delete", deleteProduct);

productRouter.post("/bulkupload", bulkupload);
productRouter.get("/csvdownload", exportProduct);

module.exports = { productRouter };
