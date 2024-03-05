const express = require('express');
const { addArea, getAllAreas, getSingleArea, updateArea, deleteArea, getSampleCSV, bulkUpdateArea, bulkUploadArea } = require("../../controllers/inventoryControllers/area")

const areaRouter = express.Router();
// ADD AREA
areaRouter.post("/add", addArea)

// GET ALL AREAS
areaRouter.get("/getall", getAllAreas)

// GET SINGLE AREA BY _id
areaRouter.get("/single/:id", getSingleArea)

// UPDATE AREA DETAILS
areaRouter.put("/update/:id", updateArea)

// DELETE AREA (soft delete)
areaRouter.delete("/delete/:id", deleteArea)

// SAMPLE AREA CSV DOWNLOAD
areaRouter.get("/samplecsv", getSampleCSV)

// AREA BULK UPLOAD
areaRouter.post("/bulkupload", bulkUploadArea)

// AREA BULK UPDATE
areaRouter.put("/bulkUpdate", bulkUpdateArea)

module.exports = { areaRouter };





