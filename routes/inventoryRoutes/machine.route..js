const express = require("express");
const { createMachine, getAllMachines, getSingleMachine, updateMachine, deleteMachine, getSampleCSV, bulkUpdateMachine, bulkUploadMachine } = require('../../controllers/inventoryControllers/machine');
const { verifyAdmin, verifyRefiller } = require("../../middlewares/inventoryMiddleware/checkUserRole");

const machineRouter = express.Router();

// CREATE MACHINE
machineRouter.post("/create", verifyAdmin, createMachine);

// GET ALL MACHINE
machineRouter.get("/getall", verifyRefiller, getAllMachines);

// GET SINGLE MACHINE
machineRouter.get("/single/:id", verifyAdmin, getSingleMachine);

// EDIT MACHINE
machineRouter.put("/update/:id", verifyAdmin, updateMachine);

// DELETE MACHINE
machineRouter.delete("/delete/:id", verifyAdmin, deleteMachine);

// SAMPLE CSV MACHINE
machineRouter.get("/samplecsv", getSampleCSV);

// BULK UPDATE MACHINE
machineRouter.post("/bulkupdate", bulkUpdateMachine);

// BULK UPLOAD MACHINE
machineRouter.post("/bulkupdate", bulkUploadMachine);

module.exports = { machineRouter };
