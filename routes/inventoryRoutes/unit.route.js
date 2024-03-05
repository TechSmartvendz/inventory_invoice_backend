const express = require('express');
const { addUnit, getAllUnits, getSingleUnit, updateUnit, deleteUnit} = require("../../controllers/inventoryControllers/unit");


const unitRouter = express.Router();
// ADD UNIT
unitRouter.post("/add", addUnit)

// GET ALL UNITS
unitRouter.get("/getall", getAllUnits)

// GET SINGLE UNIT BY _id
unitRouter.get("/single/:id", getSingleUnit)

// UPDATE UNIT DETAILS
unitRouter.put("/update/:id", updateUnit)

// DELETE UNIT (soft delete)
unitRouter.put("/delete/:id", deleteUnit)

module.exports = { unitRouter };
