const express = require("express");
const { addUnit, getUnit, getUnitById, deleteUnit, updateUnit } = require("../controllers/inv_UnitController")

const unitRouter = express.Router();

unitRouter.post("/add", auth, addUnit);
unitRouter.get("/get", auth, getUnit);
unitRouter.get("/getById", auth, getUnitById);
unitRouter.put("/update", auth, updateUnit);
unitRouter.put("/delete", auth, deleteUnit);

module.exports = { unitRouter };