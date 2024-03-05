
const addArea = async (req, res, next) => {
  try {

  } catch (error) {

  }
}

const getAllAreas = async (req, res, next) => {
  try {

  } catch (error) {

  }
}

const getSingleArea = async (req, res, next) => {
  try {

  } catch (error) {

  }
}

const updateArea = async (req, res, next) => {
  try {

  } catch (error) {

  }
}

const deleteArea = async (req, res, next) => {
  try {

  } catch (error) {

  }
}

// GET CSV SAMPLE
const getSampleCSV = async (req, res, next) => {
  try {
    const j = {
      productid: "",
      productname: "",
      description: "",
      materialtype: "",
      sellingprice: "",
      mass: "",
      unit: "",
      HSN_code: "",
    };
    const csvFields = [
      "productid",
      "productname",
      "description",
      "materialtype",
      "sellingprice",
      "mass",
      "unit",
      "HSN_code",
    ];
    const csvParser = new CsvParser({ csvFields });
    const csvdata = csvParser.parse(j);
    res.setHeader("Content-Type", "text/csv");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=Product_List.csv"
    );
    res.status(200).end(csvdata);
  } catch (error) {
    return next(error);
  }
}

const bulkUpdateArea = async (req, res, next) => {
  try {

  } catch (error) {

  }
}
const bulkUploadArea = async (req, res, next) => {
  try {

  } catch (error) {

  }
}


module.exports = { addArea, getAllAreas, getSingleArea, updateArea, deleteArea, getSampleCSV, bulkUpdateArea, bulkUploadArea };




//TODO:
module.exports.getDataByQueryFilterDataOne = async (query) => {
    const data = await Table.findOne(
      query,
      { delete_status: 0, created_at: 0, last_update: 0, __v: 0 }
    );
    return data;
  };
  //TODO:
  module.exports.getDataCountByQuery = async (query) => {
    const data = await Table.find(query).count();
    return data;
  };
  //TODO:
  module.exports.getDataListByQuery = async () => {
    const data = await Table.find(
      {},
      { id: 1, area: 1 }
    );
    return data;
  };
  //TODO:
  module.exports.updateByQuery = async (query, newdata) => {
    const data = await Table.findOneAndUpdate(query, { $set: newdata });
    return data;
  };
  //TODO:
  module.exports.dataDeleteByQuery = async (query) => {
    const data = await Table.findOneAndRemove(query);
    return data;
  };
  //TODO:
  module.exports.getDataforTable = async () => {
    const data = Table.aggregate([
      {
        "$project": {
          _id: 1,
          area: 1,
          city: {
            "$toObjectId": "$city"
          },
          "admin": {
            "$toObjectId": "$admin"
          }
        }
      },
      {
        "$lookup": {
          "from": "user_infos",
          "localField": "admin",
          "foreignField": "_id",
          "as": "output"
        }
      },
      { $unwind: "$output" },
      {
        "$lookup": {
          "from": "cities",
          "localField": "city",
          "foreignField": "_id",
          "as": "output2"
        }
      },
      { $unwind: "$output2" },
      {
        $project: {
          _id: 1,
          area: 1,
          city: "$output2.city",
          admin: "$output.user_id"
        }
      }
    ])
  
    return data;
  };