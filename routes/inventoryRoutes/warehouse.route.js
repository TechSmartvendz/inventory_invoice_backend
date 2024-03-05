const express = require("express");
const { addWareHouse, getAllWareHouses, getSingleWareHouse, updateWareHouse, deleteWareHouse, addWareHouseStock } = require("../../controllers/inventoryControllers/warehouse");


const warehouseRouter = express.Router();
// add warehouse
warehouseRouter.post("/add", addWareHouse)

// get all warehouses
warehouseRouter.get("/getall", getAllWareHouses)

// get single warehouse by _id
warehouseRouter.get("/single/:id", getSingleWareHouse)

// Update warehouse Details
warehouseRouter.put("/update/:id", updateWareHouse)

// deleteWarehouse (soft delete)
warehouseRouter.put("/delete/:id", deleteWareHouse)

module.exports = { warehouseRouter };
