const { SupplierModel } = require("../../models/inventoryModels/supplier.model");

// add warehouse
const addSupplier = async (req, res, next) => {
    const { } = req.body;
    try {
        const checkSupplier = await SupplierModel.find({
            supplierName: req.body.supplierName
        });
        if (checkSupplier) {
            return res.status(400)
                .send({ success: false, message: "Supplier Already registered" });
        }
        const newSupplier = new SupplierModel({ admin: req.user._id, ...req.body });
        const savedSupplier = await newSupplier.save()
        return res.status(200)
            .send({
                success: true,
                message: "Supplier Added Successfully",
                savedSupplier,
            });
    }
    catch (error) {
        return next(error)
    }
}

// list all Suppliers
const getAllSuppliers = async (req, res, next) => {
    try {
        const suppliers = await SupplierModel
            .find({ isDeleted: false })
        // .select("_id SupplierName city contactPerson admin");
        return res.status(200)
            .send({
                success: true,
                suppliers,
            });
    } catch (error) {
        return next(error)
    }
}
 
// get Supplier by id
const getSingleSupplier = async (req, res, next) => {
    const { id } = req.params
    try {
        const Supplier = await SupplierModel.findById(
            { id }, { isDeleted: false }
        );
        return res.status(200)
            .send({
                success: true,
                Supplier,
            });
    } catch (error) {
        return next(error)
    }
}

// Update Supplier
const updateSupplier = async (req, res, next) => {
    const { id } = req.params;
    try {
        const updatedSupplier = await SupplierModel.findByIdAndUpdate(id, { $set: req.body }, { new: true });
        return res.status(200)
            .send({
                success: true,
                message: "Supplier Updated Successfully",
                updatedSupplier,
            });
    }
    catch (error) {
        return next(error)
    }
}
// delete Supplier
const deleteSupplier = async (req, res, next) => {
    const { id } = req.params;
    try {
        const deletedSupplier = await SupplierModel.findByIdAndUpdate(id, { isDeleted: false }, { new: true });
        return res.status(200)
            .send({
                success: true,
                message: "Supplier Deleted Successfully",
                deletedSupplier
            });
    }
    catch (error) {
        return next(error)
    }
}

module.exports = {
    addSupplier, getAllSuppliers, getSingleSupplier,
    updateSupplier, deleteSupplier,
}

