const express = require("express");
const { addWareHouse, getAllWareHouses, getSingleWareHouse, updateWareHouse, deleteWareHouse, addWareHouseStock, getSingleWareHouseByAdmin } = require("../../controllers/inventoryControllers/warehouse");
const { verifyAdmin, verifySuperAdmin } = require("../../middlewares/inventoryMiddleware/checkUserRole");


const warehouseRouter = express.Router();
// add warehouse
warehouseRouter.post("/add",verifySuperAdmin, addWareHouse)

// get all warehouses
warehouseRouter.get("/getall",verifySuperAdmin, getAllWareHouses)

//get single warehouse id by admin id
warehouseRouter.get("/getsingle/admin",verifyAdmin, getSingleWareHouseByAdmin)

// get single warehouse by _id
warehouseRouter.get("/single/:id",verifySuperAdmin, getSingleWareHouse)

// Update warehouse Details
warehouseRouter.put("/update/:id", updateWareHouse)

// deleteWarehouse (soft delete)
warehouseRouter.put("/delete/:id", deleteWareHouse)

module.exports = { warehouseRouter };
