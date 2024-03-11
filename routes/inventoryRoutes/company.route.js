const express = require('express');
const { addCompany, getAllCompanies, getSingleCompany,
    updateCompany, deleteCompany,
} = require("../../controllers/inventoryControllers/company");
const { verifyAdmin } = require('../../middlewares/inventoryMiddleware/checkUserRole');

const companyRouter = express.Router();

// CREATE / ADD COMPANY
companyRouter.post('/create',verifyAdmin, addCompany);

// GET ALL COMPANY'S 
companyRouter.get('/getall', getAllCompanies);

// GET SINGLE COMPANY 
companyRouter.get('/single/:id', getSingleCompany);

// UPDATE COMPANY 
companyRouter.put('/update/:id', updateCompany);

// DELETE COMPANY 
companyRouter.delete('/delete/:id', deleteCompany);

module.exports = { companyRouter };