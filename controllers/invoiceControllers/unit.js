
const addUnit = async (req, res) => {
  try {
    
  } catch (error) {
    
  }
};

const getUnit = async (req, res) => {
  const filter = { isDeleted: false };
  const projection = {};
  const options = {};

  const data = await utils.getData(inv_Unit, filter, projection, options);

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

const getUnitById = async (req, res) => {
  const filter = { _id: req.query.id, isDeleted: false };
  const projection = {};
  const options = {};

  const data = await utils.getData(inv_Unit, filter, projection, options);

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

const updateUnit = async (req, res) => {
  const pararms = req.body;
  const data = await utils.updateData(inv_Unit, { _id: req.query.id }, pararms);
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

const deleteUnit = async (req, res) => {
  let pararms = {
    isDeleted: true,
  };
  const data = await utils.updateData(inv_Unit, { _id: req.query.id }, pararms);
  if (data) {
    return rc.setResponse(res, {
      success: true,
      data: "Data Deleted",
    });
  }
};

module.exports = {
  addUnit,
  getUnit,
  getUnitById,
  updateUnit,
  deleteUnit,
};
