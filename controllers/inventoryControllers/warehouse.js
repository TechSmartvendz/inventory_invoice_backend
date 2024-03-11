const { UserModel } = require("../../models/inventoryModels/users.model");
const { WarehouseModel } = require("../../models/inventoryModels/warehouse.model");

// add warehouse (only for superAdmin)
const addWareHouse = async (req, res, next) => {
    const { id, role } = req.user
    const payload = req.body;
    // console.log('payload: ', payload);
    try {
        const checkWarehouse = await WarehouseModel.findOne({
            wareHouseName: req.body.wareHouseName
        });
        if (checkWarehouse) {
            return res.status(400)
                .send({ success: false, message: "Warehouse Already registered" });
        }
        const newWarehouse = new WarehouseModel({ createdBy: id, ...payload });
        const savedWarehouse = await newWarehouse.save()
        return res.status(200)
            .send({
                success: true,
                message: "Warehouse Added Successfully",
                savedWarehouse,
            });
    }
    catch (error) {
        console.log('error: ', error);
        return next(error)
    }
}

// list all warehouses (only for superAdmin)
const getAllWareHouses = async (req, res, next) => {
    const { id, role } = req.user
    // console.log('req.user: ', req.user);
    try {
        const warehouses = await WarehouseModel
            .find({ isDeleted: false }).populate("createdBy")
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
const getSingleWareHouseByAdmin = async (req, res, next) => {
    const { id, role } = req.user;
    try {
        const adminDetails = await UserModel.findById(id).populate("warehouse")
        // console.log('adminDetails: ', adminDetails);
        const warehouse = await WarehouseModel.findById(
            { _id: adminDetails.warehouse._id }, { isDeleted: false }
        )
        // .populate("createdBy")
        return res.status(200)
            .send({
                success: true,
                warehouse,
            });
    } catch (error) {
        return next(error)
    }
}

// get warehouse by id
const getSingleWareHouse = async (req, res, next) => {
    const { id } = req.params
    try {
        const warehouse = await WarehouseModel.findOne(
            { _id: id }, { isDeleted: false }
        ).populate("createdBy");
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
    addWareHouse, getAllWareHouses, getSingleWareHouseByAdmin, getSingleWareHouse,
    updateWareHouse, deleteWareHouse,
}