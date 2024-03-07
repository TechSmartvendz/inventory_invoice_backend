const { TaxModel } = require("../../models/invoiceModels/tax.model");


const addTax = async (req, res) => {
  const { code } = req.body;
  const existingtax = await TaxModel.findOne({ $or: [{ hsn_Code: code }, { code }] });
  if (existingtax) {
    return res.send("Already created");
  }
  let newTax = new TaxModel(req.body);
  newTax.admin = req.userData._id;
  // change this after adding auth in routes
  // newTax.admin = "121212";
  if (!newTax) {
    return rc.setResponse(res, {
      msg: "No Data to insert",
    });
  }
  const data = await utils.saveData(TaxModel, newTax);
  if (data) {
    return res.status(200)
    .send({
      success: true,
      machines,
    });
  }
};

const getTax = async (req, res) => {
  //   const data = await utils.findDocuments()

  const filter = { isDeleted: false };
  const projection = {};
  const options = {};

  const data = await utils.getData(TaxModel, filter, projection, options);

  if (data) {
    return rc.setResponse(res, {
      success: true,
      msg: "Data Fetched",
      data: data,
    });
  } else {
    return rc.setResponse(res, {
      msg: "Data not Found",
    });
  }
};

const getTaxById = async (req, res) => {
  //   const data = await utils.findDocuments()

  const filter = { _id: req.query.id, isDeleted: false };
  const projection = {};
  const options = {};

  const data = await utils.getData(TaxModel, filter, projection, options);

  if (data) {
    return rc.setResponse(res, {
      success: true,
      msg: "Data Fetched",
      data: data,
    });
  } else {
    return rc.setResponse(res, {
      msg: "Data not Found",
    });
  }
};

const updateTax = async (req, res) => {
  const obj = req.body;
  const data = await utils.updateData(TaxModel, { _id: req.query.id }, obj);
  if (data) {
    return rc.setResponse(res, {
      success: true,
      msg: "Data updated",
      // data: data,
    });
  } else {
    return rc.setResponse(res, {
      msg: "Some error occured",
    });
  }
};

const deleteTax = async (req, res) => {
  let obj = {
    isDeleted: true,
  };
  const data = await utils.updateData(TaxModel, { _id: req.query.id }, obj);
  if (data) {
    return rc.setResponse(res, {
      success: true,
      data: "Data Deleted",
    });
  }
};

module.exports = { addTax, getTax, getTaxById, updateTax, deleteTax };
