const { UserModel } = require("../../models/inventoryModels/users.model");

//GET SINGLE
const getSingleUser = async (req, res, next) => {
    const { id } = req.params;
    try {
        const user = await UserModel.findById(id);
        return res.status(200)
            .json({
                success: true,
                user,
            });
    }
    catch (err) {
        return next(err)
    }
}

//GET ALL
const getAllUser = async (req, res, next) => {
    try {
        const users = await UserModel.find()
            .populate("warehouse");
        return res.status(200)
            .json({
                success: true,
                users,
            });
    }
    catch (err) {
        // res.status(500).json(err)
        return next(err)
    }
}

//UPDATE
const updateUser = async (req, res, next) => {
    const { id } = req.params;
    const payload = req.body;
    // console.log('payload: ', payload);
    try {
        const updatedUser = await UserModel.findByIdAndUpdate(id, { $set: payload }, { new: true });
        return res.status(200)
            .json({
                success: true,
                message: "User Updated Successfully",
                updatedUser,
            });
    }
    catch (err) {
        return next(err)
    }
}

//DELETE
// Need to check the access of all machines and remove access/change access to another
// person to access machines
const deleteUser = async (req, res, next) => {
    const { id } = req.params;
    try {
        const deletedUser = await UserModel.findByIdAndDelete(id);
        return res.status(200)
            .json({
                success: true,
                message: "User Deleted Successfully",
                deletedUser,
            });
    }
    catch (err) {
        return next(err)
    }
}


module.exports = { getSingleUser, updateUser, getAllUser, deleteUser }

