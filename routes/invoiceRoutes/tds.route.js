const express = require("express");
const {
  addTDS,
  getTDS,
  getTDSById,
  updateTDS,
  deleteTDS,
  addTdsSection,
  getTdsSection,
  getTdsSectionById,
  updateTdsSection,
  deleteTdsSection,
} = require("../../controllers/invoiceControllers/tds");


const tdsRouter = express.Router();

tdsRouter.post("/add", addTDS);
tdsRouter.get("/get", getTDS);
tdsRouter.get("/getById", getTDSById);
tdsRouter.put("/update", updateTDS);
tdsRouter.put("/delete", deleteTDS);

tdsRouter.post("/add/section", addTdsSection);
tdsRouter.get("/get/section", getTdsSection);
tdsRouter.get("/getById/section", getTdsSectionById);
tdsRouter.put("/update/section", updateTdsSection);
tdsRouter.put("/delete/section", deleteTdsSection);

module.exports = { tdsRouter };
