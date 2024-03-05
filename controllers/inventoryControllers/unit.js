const { UnitModel } = require("../../models/inventoryModels/unit.model");


// ADD UNIT
const addUnit = async (req, res, next) => {
  const { } = req.body;
  try {
    const checkUnit = await UnitModel.find({
      wareHouseName: req.body.wareHouseName
    });
    if (checkUnit) {
      return res.status(400)
        .send({ success: false, message: "Unit Already registered" });
    }
    const newUnit = new WarehouseModel({ admin: req.user._id, ...req.body });
    const savedUnit = await newUnit.save()
    return res.status(200)
      .send({
        success: true,
        message: "Unit Added Successfully",
        savedUnit,
      });
  }
  catch (error) {
    return next(error)
  }
}

//GET SINGLE
const getSingleUnit = async (req, res, next) => {
  const { id } = req.params;
  try {
    const unit = await UnitModel.findById(id);
    return res.status(200)
      .json({
        success: true,
        unit,
      });
  }
  catch (err) {
    return next(err)
  }
}

//GET ALL
const getAllUnits = async (req, res, next) => {
  try {
    const Units = await UnitModel.find();
    return res.status(200)
      .json({
        success: true,
        Units,
      });
  }
  catch (err) {
    // res.status(500).json(err)
    return next(err)
  }
}

//UPDATE
const updateUnit = async (req, res, next) => {
  const { id } = req.params;
  const payload = req.body;
  try {
    const updatedUnit = await UnitModel.findByIdAndUpdate(id, { $set: payload }, { new: true });
    return res.status(200)
      .json({
        success: true,
        message: "Unit Updated Successfully",
        updatedUnit,
      });
  }
  catch (err) {
    return next(err)
  }
}

//DELETE
const deleteUnit = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedUnit = await UnitModel.findByIdAndDelete(id);
    return res.status(200)
      .json({
        success: true,
        message: "Unit Deleted Successfully",
        deletedUnit,
      });
  }
  catch (err) {
    return next(err)
  }
}


module.exports = { addUnit, getSingleUnit, updateUnit, getAllUnits, deleteUnit }