const { CompanyModel } = require("../../models/inventoryModels/company.model");

// add warehouse
const addCompany = async (req, res, next) => {
    const { id, role } = req.user;
    const payload = req.body;
    try {
        const checkCompany = await CompanyModel.findOne({
            CompanyName: payload.CompanyName
        });
        if (checkCompany) {
            return res.status(400)
                .send({ success: false, message: "Company Already registered" });
        }
        const newCompany = new CompanyModel({ createdBy: id, ...payload });
        const savedCompany = await newCompany.save();
        return res.status(200)
            .send({
                success: true,
                message: "Company Added Successfully",
                savedCompany,
            });
    }
    catch (error) {
        return next(error)
    }
}
// list all Companies
const getAllCompanies = async (req, res, next) => {
    try {
        const Companies = await CompanyModel
            .find({ isDeleted: false })
            .populate("createdBy")
        // .select("_id CompanyName city contactPerson admin");
        return res.status(200)
            .send({
                success: true,
                Companies,
            });
    } catch (error) {
        return next(error)
    }
}

// get Company by id
const getSingleCompany = async (req, res, next) => {
    const { id } = req.params
    try {
        const Company = await CompanyModel.findById(
            { id }, { isDeleted: false }
        );
        return res.status(200)
            .send({
                success: true,
                Company,
            });
    } catch (error) {
        return next(error)
    }
}

// Update Company
const updateCompany = async (req, res, next) => {
    const { id } = req.params;
    try {
        const updatedCompany = await CompanyModel.findByIdAndUpdate(id, { $set: req.body }, { new: true });
        return res.status(200)
            .send({
                success: true,
                message: "Company Updated Successfully",
                updatedCompany,
            });
    }
    catch (error) {
        return next(error)
    }
}
// delete Company
const deleteCompany = async (req, res, next) => {
    const { id } = req.params;
    try {
        const deletedCompany = await CompanyModel.findByIdAndUpdate(id, { isDeleted: false }, { new: true });
        return res.status(200)
            .send({
                success: true,
                message: "Company Deleted Successfully",
                deletedCompany
            });
    }
    catch (error) {
        return next(error)
    }
}

module.exports = {
    addCompany, getAllCompanies, getSingleCompany,
    updateCompany, deleteCompany,
}
