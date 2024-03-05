const express = require('express');
const { addCompany, getAllCompanys, getSingleCompany,
    updateCompany, deleteCompany,
} = require("../../controllers/inventoryControllers/company")

const companyRouter = express.Router();

// CREATE / ADD COMPANY
companyRouter.post('/create', addCompany);

// GET ALL COMPANY'S 
companyRouter.get('/getall', getAllCompanys);

// GET SINGLE COMPANY 
companyRouter.get('single/:id', getSingleCompany);

// UPDATE COMPANY 
companyRouter.put('update/:id', updateCompany);

// DELETE COMPANY 
companyRouter.delete('delete/:id', deleteCompany);

module.exports = { companyRouter };