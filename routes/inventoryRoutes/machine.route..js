const express = require("express");
const { createMachine, getAllMachines, getSingleMachine, updateMachine, deleteMachine, getSampleCSV, bulkUpdateMachine, bulkUploadMachine } = require('../../controllers/inventoryControllers/machine')

const machineRouter = express.Router();

// CREATE MACHINE
machineRouter.post("/create", createMachine);

// GET ALL MACHINE
machineRouter.get("/getall", getAllMachines);

// GET SINGLE MACHINE
machineRouter.get("/single/:id", getSingleMachine);

// EDIT MACHINE
machineRouter.put("/update/:id", updateMachine);

// DELETE MACHINE
machineRouter.delete("/delete/:id", deleteMachine);

// SAMPLE CSV MACHINE
machineRouter.get("/samplecsv", getSampleCSV);

// BULK UPDATE MACHINE
machineRouter.post("/bulkupdate", bulkUpdateMachine);

// BULK UPLOAD MACHINE
machineRouter.post("/bulkupdate", bulkUploadMachine);

module.exports = { machineRouter };
