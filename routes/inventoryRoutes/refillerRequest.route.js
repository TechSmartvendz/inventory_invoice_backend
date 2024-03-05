const express = require("express");
const { createRefillRequest, getAllRefillRequest, getSingleRefillRequestByID,
  approveRefillRequest, editRefillRequest, deleteRefillRequest
} = require('../../controllers/inventoryControllers/refillerRequest')


const refillRequestRouter = express.Router();

// CREATE REFILL REQUEST
refillRequestRouter.post("/create", createRefillRequest);

// GET ALL REFILL REQUEST
refillRequestRouter.get("/getall", getAllRefillRequest);

// GET SINGLE REFILL REQUEST
refillRequestRouter.get("/single/:id", getSingleRefillRequestByID);

// APPROVE REFILL REQUEST By ADMIN/SUPERADMIN
refillRequestRouter.post("/approve/:id", approveRefillRequest);

// EDIT REFILL REQUEST
refillRequestRouter.put("/update/:id", editRefillRequest);

// DELETE REFILL REQUEST
refillRequestRouter.delete("/delete/:id", deleteRefillRequest);


module.exports = { refillRequestRouter };
