const { InvoiceProductModel } = require("../../models/invoiceModels/product.model");

const createProduct = async (req, res) => {
  const pararms = req.body;
  const checkData = await InvoiceProductModel.findOne({ productName: req.body.productName.trim() });
  if (checkData) {
    return res.send("Already created");
  }
  let obj = new invProduct(pararms);
  obj.admin = req.userData._id;
  if (!obj) {
    return rc.setResponse(res, {
      success: false,
      msg: "No Data to insert",
    });
  }
  const data = await utils.saveData(invProduct, obj);
  if (data) {
    return res.status(200)
      .send({
        success: true,
        machines,
      });
  }
};

const getAllProducts = async (req, res) => {
  try {

  } catch (error) {

  }
};

const getProductById = async (req, res) => {
  try {
    const filter = { _id: req.query.id, isDeleted: false };
    const projection = {};
    const options = {};
    const data = await InvoiceProductModel.find(invProduct, filter, projection, options);

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
  } catch (error) {

  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.bodymparams;

    const data = await InvoiceProductModel.findByIdAndUpdate();
    // console.log("data: ", data);
    return res.status(200)
      .send({
        success: true,
        data,
      });
  } catch (error) {

  }

};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.pararms
  } catch (error) {

  }
  const data = await InvoiceProductModel.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    return res.status(200)
      .send({
        success: true,
        data,
      });
};

const bulkupload = async (req, res) => {
  // console.log(req.userData);
  const validateRow = (data) => {
    if (
      data.productId === "" ||
      data.productId === "NA" ||
      data.productId === "#N/A"
    ) {
      return "productId is missing";
    } else if (
      data.productType === "" ||
      data.productType === "NA" ||
      data.productType === "#N/A"
    ) {
      return "productType is missing";
    } else if (
      data.productName === "" ||
      data.productName === "NA" ||
      data.productName === "#N/A"
    ) {
      return "productName is missing";
    } else if (data.unit === "" || data.unit === "NA" || data.unit === "#N/A") {
      return "unit is missing";
    } else if (
      data.sellingPrice === "" ||
      data.sellingPrice === "NA" ||
      data.sellingPrice === "#N/A"
    ) {
      return "sellingPrice is missing";
    } else if (
      data.sellingAccount === "" ||
      data.sellingAccount === "NA" ||
      data.sellingAccount === "#N/A"
    ) {
      return "sellingAccount is missing";
    } else if (
      data.salesDescription === "" ||
      data.salesDescription === "NA" ||
      data.salesDescription === "#N/A"
    ) {
      return "salesDescription is missing";
    } else if (
      data.costPrice === "" ||
      data.costPrice === "NA" ||
      data.costPrice === "#N/A"
    ) {
      return "costPrice is missing";
    } else if (
      data.account === "" ||
      data.account === "NA" ||
      data.account === "#N/A"
    ) {
      return "account is missing";
    } else if (
      data.purchaseDescription === "" ||
      data.purchaseDescription === "NA" ||
      data.purchaseDescription === "#N/A"
    ) {
      return "purchaseDescription is missing";
    } else if (
      data.preferredVendor === "" ||
      data.preferredVendor === "NA" ||
      data.preferredVendor === "#N/A"
    ) {
      return "preferredVendor is missing";
    } else if (data.tax === "" || data.tax === "NA" || data.tax === "#N/A") {
      return "tax is missing";
    } else if (
      data.createdDate === "" ||
      data.createdDate === "NA" ||
      data.createdDate === "#N/A"
    ) {
      return "createdDate is missing";
    }
    return null;
  };

  const processRow = async (data) => {
    try {
      // console.log(data);
      const filter = { hsn_Code: data.tax, isDeleted: false };
      const projection = {};
      const options = {};
      const checkData = await utils.findDocuments(
        invTax,
        filter,
        projection,
        options
      );
      const dateParts = data.createdDate.split('-');
      const formattedDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;

      data.tax = checkData[0]._id;
      data.admin = req.userData._id;
      data.createdDate = formattedDate;
      const processdata = await utils.saveData(invProduct, data);
      if (!processdata) {
        throw new Error("Failed to save data");
      }
    } catch (error) {
      console.log("Error Process Row: ", error);
      throw error;
    }
  };
  // console.log("processRow: ", processRow);

  try {
    const { results, rejectData } = await helper.performBulkUpload(
      `public/${req.file.filename}`,
      validateRow,
      processRow
    );

    if (rejectData.length > 0) {
      return res.json({
        success: true,
        msg: "Data Fetched",
        data: {
          dataupload: "partial upload",
          reject_data: rejectData,
          stored_data: results.length,
        },
      });
    } else {
      return res.json({
        success: true,
        msg: "Data Fetched",
        data: { dataupload: "success", stored_data: results.length },
      });
    }
  } catch (error) {
    // Handle errors
    console.error(error);
    return res.json({ error: { code: 500 } });
  }
};

const exportProduct = async (req, res) => {
  const schema = {
    productId: "",
    productType: "",
    productName: "",
    unit: "",
    sellingPrice: "",
    sellingAccount: "",
    salesDescription: "",
    costPrice: "",
    account: "",
    purchaseDescription: "",
    preferredVendor: "",
    tax: "",
    createdDate: "",
  };
  const fields = Object.keys(schema);
  helper.downloadSampleCSV(res, schema, fields);
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  bulkupload,
  exportProduct,
};
