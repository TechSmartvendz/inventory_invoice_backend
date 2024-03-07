
const addPaymentTerm = async (req, res) => {
  let pararms = req.body;
  const checkData = await inv_PaymentTerm.findOne({
    paymentTermName: pararms.paymentTermName.trim(),
  });
  // console.log("checkData: ", checkData);
  if (checkData) {
    return res.send("Already created");
  }
  let newPaymentTerm = new inv_PaymentTerm(pararms);
  newPaymentTerm.admin = req.userData._id;
  // newPaymentTerm.admin = "121212";
  if (!newPaymentTerm) {
    return rc.setResponse(res, {
      msg: "No Data to insert",
    });
  }
  const data = await utils.saveData(inv_PaymentTerm, newPaymentTerm);
  if (data) {
    return res.status(200)
    .send({
      success: true,
      machines,
    });
  }
};

const getPaymentTerm = async (req, res) => {
  //   const data = await utils.findDocuments()

  const filter = { isDeleted: false };
  const projection = {};
  const options = {};

  const data = await utils.getData(
    inv_PaymentTerm,
    filter,
    projection,
    options
  );

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

const getPaymentTermById = async (req, res) => {
  //   const data = await utils.findDocuments()

  const filter = { _id: req.query.id, isDeleted: false };
  const projection = {};
  const options = {};

  const data = await utils.getData(
    inv_PaymentTerm,
    filter,
    projection,
    options
  );

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

const updatePaymentTerm = async (req, res) => {
  const pararms = req.body;
  const data = await utils.updateData(
    inv_PaymentTerm,
    { _id: req.query.id },
    pararms
  );
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

const deletePaymentTerm = async (req, res) => {
  let pararms = {
    isDeleted: true,
  };
  const data = await utils.updateData(
    inv_PaymentTerm,
    { _id: req.query.id },
    pararms
  );
  if (data) {
    return rc.setResponse(res, {
      success: true,
      data: "Data Deleted",
    });
  }
};

module.exports = {
  addPaymentTerm,
  getPaymentTerm,
  getPaymentTermById,
  updatePaymentTerm,
  deletePaymentTerm,
};
