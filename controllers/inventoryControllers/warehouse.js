const { WarehouseModel } = require("../../models/inventoryModels/warehouse.model");

// add warehouse
const addWareHouse = async (req, res, next) => {
    const { } = req.body;
    try {
        const checkWarehouse = await WarehouseModel.find({
            wareHouseName: req.body.wareHouseName
        });
        if (checkWarehouse) {
            return res.status(400)
                .send({ success: false, message: "Warehouse Already registered" });
        }
        const newWarehouse = new WarehouseModel({ admin: req.user._id, ...req.body });
        const savedWarehouse = await newWarehouse.save()
        return res.status(200)
            .send({
                success: true,
                message: "Warehouse Added Successfully",
                savedWarehouse,
            });
    }
    catch (error) {
        return next(error)
    }
}

// list all warehouses
const getAllWareHouses = async (req, res, next) => {
    try {
        const warehouses = await WarehouseModel
            .find({ isDeleted: false })
        // .select("_id wareHouseName city contactPerson admin");
        return res.status(200)
            .send({
                success: true,
                warehouses,
            });
    } catch (error) {
        return next(error)
    }
}

// get warehouse by id
const getSingleWareHouse = async (req, res, next) => {
    const { id } = req.params
    try {
        const warehouse = await WarehouseModel.findById(
            { id }, { isDeleted: false }
        );
        return res.status(200)
            .send({
                success: true,
                warehouse,
            });
    } catch (error) {
        return next(error)
    }
}

// Update warehouse
const updateWareHouse = async (req, res, next) => {
    const { id } = req.params;
    try {
        const updatedWarehouse = await WarehouseModel.findByIdAndUpdate(id, { $set: req.body }, { new: true });
        return res.status(200)
            .send({
                success: true,
                message: "Warehouse Updated Successfully",
                updatedWarehouse,
            });
    }
    catch (error) {
        return next(error)
    }
}
// deleteWarehouse
const deleteWareHouse = async (req, res, next) => {
    const { id } = req.params;
    try {
        const deletedWarehouse = await WarehouseModel.findByIdAndUpdate(id, { isDeleted: false }, { new: true });
        return res.status(200)
            .send({
                success: true,
                message: "Warehouse Deleted Successfully",
                deletedWarehouse
            });
    }
    catch (error) {
        return next(error)
    }
}


module.exports = {
    addWareHouse, getAllWareHouses, getSingleWareHouse,
    updateWareHouse, deleteWareHouse,
}