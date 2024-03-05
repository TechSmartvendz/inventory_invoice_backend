const { MachineModel } = require("../../models/inventoryModels/machine.model");

// CREATE MACHINE
const createMachine = async (req, res, next) => {
  try {

    var cdata = await TableModelPermission.getDataByQueryFilterDataOne(query);
    if (cdata.addnewmachine) {
      // console.log(req.body);
      const warehousedata = await warehouse.findOne({
        wareHouseName: req.body.warehouse,
      });
      newRow = new TableModel(req.body);
      newRow.admin = req.user._id;
      newRow.warehouse = warehousedata._id;
      // newRow.country=cdata.id
      if (!newRow) {
        return rc.setResponse(res, {
          msg: "No Data to insert",
        });
      }
      const data = await TableModel.addRow(newRow);
      if (data) {
        return rc.setResponse(res, {
          success: true,
          msg: "Data Inserted",
          data: data,
        });
      }
    } else {
      return rc.setResponse(res, { error: { code: 403 } });
    }
  } catch (error) {

  }
}
// GET ALL MACHINE
const getAllMachines = async (req, res, next) => {
  try {
    const { role, _id } = req.user;
    const filter =
      role === "admin" ? { admin: _id }
        : role === "refiller" ? { refiller: _id }
          : {}

    const machines = await MachineModel.find({ ...filter, delete_status: false });
    return res.status(200)
      .send({
        success: true,
        machines,
      });
  } catch (error) {
    return next(error)
  }
}
// GET SINGLE MACHINE
const getSingleMachine = async (req, res, next) => {
  try {
    const query = {
      role: req.user.role,
    };
    var cdata = await TableModelPermission.getDataByQueryFilterDataOne(query);
    if (cdata.addnewmachine) {
      // const role = req.params.id;
      // const query = {
      //   _id: role,
      // };
      // const data = await TableModel.getDataByQueryFilterDataOne(query);
      const machineid = req.params.id;
      const data = await TableModel.getDataByQueryFilterDataOneAggregate(
        machineid
      );
      // console.log("data",data)
      if (data) {
        return rc.setResponse(res, {
          success: true,
          msg: "Data Fetched",
          data: data[0],
        });
      } else {
        return rc.setResponse(res, {
          msg: "Data not Found",
        });
      }
    } else {
      return rc.setResponse(res, { error: { code: 403 } });
    }
  } catch (error) {

  }
}
// UPDATE MACHINE
const updateMachine = async (req, res, next) => {
  try {
    const warehousedata = await warehouse.findOne({
      wareHouseName: req.body.warehouse,
    });
    const newData = req.body;
    newData.admin = req.user.id;
    newData.warehouse = warehousedata._id;
    const query = {
      role: req.user.role,
    };
    var cdata = await TableModelPermission.getDataByQueryFilterDataOne(query);
    if (cdata.addnewcompany) {
      const query = { machineid: req.params.id };
      const data = await TableModel.updateByQuery(query, newData);
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
    } else {
      return rc.setResponse(res, { error: { code: 403 } });
    }
  } catch (error) {

  }
}
// DELETE MACHINE
const deleteMachine = async (req, res, next) => {
  try {
    let query = {
      role: req.user.role,
    };
    var cdata = await TableModelPermission.getDataByQueryFilterDataOne(query);
    if (cdata.addnewcompany) {
      const id = req.params.id;
      query = { _id: req.params.id };
      // const rdata = await TableModel.getDataByQueryFilterDataOne(query);
      // query={role:rdata.role}
      // const count = await TableModelUser.getDataCountByQuery(query);
      // if(!count){
      // const data = await TableModel.dataDeleteByQuery(query);
      const data = await TableModel.updateByQuery(query, { delete_status: true });
      const newquery = { machineid: req.params.id, delete_status: false };
      // console.log('newquery: ', newquery);
      const updatequery = { $set: { delete_status: true } };
      const slotData = await TableModelMachineSlot.updateMany(newquery, updatequery);
      if (data) {
        return rc.setResponse(res, {
          success: true,
          msg: "Deleted Successfully",
          data: data,
        });
      } else {
        return rc.setResponse(res, {
          msg: "Data not Found",
        });
      }

      // }else{
      //     return rc.setResponse(res, {
      //         msg: "Can't Delete this Role it is using by some Users"
      //     })
      // }
    } else {
      return rc.setResponse(res, { error: { code: 403 } });
    }
  } catch (error) {

  }
}
// SAMPLE CSV MACHINE FOR CREATE MACHINE
const getSampleCSV = async (req, res, next) => {
  try {
    const query = {
      role: req.user.role,
    };
    // console.log(query);
    let cdata = await TableModelPermission.getDataByQueryFilterDataOne(query);
    // console.log(cdata);
    if (cdata.updatebulkproduct) {
      const j = {
        machineid: "",
        machinename: "",
        companyid: "",
        warehouse: "",
        // refiller: "",
        // building: "",
        location: "",
        // producttype: "",
        totalslots: "",
      };
      const csvFields = [
        "machineid",
        "machinename",
        "companyid",
        "warehouse",
        "refiller",
        "building",
        "location",
        "producttype",
        "totalslots",
      ];
      const csvParser = new CsvParser({ csvFields });
      const csvdata = csvParser.parse(j);
      res.setHeader("Content-Type", "text/csv");
      res.setHeader(
        "Content-Disposition",
        "attachment; filename=SampleImportMachine.csv"
      );
      res.status(200).end(csvdata);
    } else {
      return rc.setResponse(res, { error: { code: 403 } });
    }
  } catch (error) {

  }
}
// BULK UPDATE MACHINE
const bulkUpdateMachine = async (req, res, next) => {
  try {

  } catch (error) {

  }
}
// BULK UPLOAD MACHINE
const bulkUploadMachine = async (req, res, next) => {
  try {
    const results = [];
    var rejectdata = [];
    let rejectmachines = [];

    function rejectmachinedata(x) {
      if (x) {
        rejectmachines.push(x);
      }
      return rejectmachines;
    }

    function reject(x) {
      if (x) {
        rejectdata.push(x);
      }
      return rejectdata;
    }

    var storeddata = [];

    function succ(x) {
      if (x) {
        storeddata.push(x);
      }
      return storeddata;
    }
    const query = { role: req.user.role };
    var cdata = await TableModelPermission.getDataByQueryFilterDataOne(query);

    if (cdata.bulkproductupload) {
      var path = `public/${req.file.filename}`;
      fs.createReadStream(path)
        .pipe(csv({}))
        .on("data", async (data) => results.push(data))

        .on("end", async () => {
          // console.log("result", results);
          for (i = 0; i < results.length; i++) {
            if (
              results[i].machineid == "" ||
              results[i].machineid == "NA" ||
              results[i].machineid == "#N/A"
            ) {
              // console.log(`MachineId is not available`);
              // console.log(results[i]);
              results[i].error = "MachineId is missing";
              const r = reject(results[i]);
            } else if (
              results[i].machinename == "" ||
              results[i].machinename == "NA" ||
              results[i].machinename == "#N/A"
            ) {
              // console.log(`machinename is not available`);
              // console.log(results[i]);
              results[i].error = "machinename is missing";
              const r = reject(results[i]);
            } else if (
              results[i].companyid == "" ||
              results[i].companyid == "NA" ||
              results[i].companyid == "#N/A"
            ) {
              // console.log(`Max_Quantity is not available`);
              // console.log(results[i]);
              results[i].error = "Max_Quantity is missing";
              const r = reject(results[i]);
            } else if (
              results[i].warehouse == "" ||
              results[i].warehouse == "NA" ||
              results[i].warehouse == "#N/A"
            ) {
              // console.log(`warehouse is not available`);
              // console.log(results[i]);
              results[i].error = "warehouse is missing";
              const r = reject(results[i]);
            } else if (
              results[i].refiller == "" ||
              results[i].refiller == "NA" ||
              results[i].refiller == "#N/A"
            ) {
              // console.log(`refiller is not available`);
              // console.log(results[i]);
              results[i].error = "refiller is missing";
              const r = reject(results[i]);
            }
            //  else if (
            //   results[i].buiding == "" ||
            //   results[i].buiding == "NA" ||
            //   results[i].buiding == "#N/A"
            // ) {
            //   console.log(`buiding is not available`);
            //   console.log(results[i]);
            //   results[i].error = "buiding is missing";
            //   const r = reject(results[i]);
            // }
            else if (
              results[i].location == "" ||
              results[i].location == "NA" ||
              results[i].location == "#N/A"
            ) {
              // console.log(`location is not available`);
              // console.log(results[i]);
              results[i].error = "location is missing";
              const r = reject(results[i]);
            }
            // else if (
            //   results[i].producttype == "" ||
            //   results[i].producttype == "NA" ||
            //   results[i].producttype == "#N/A"
            // ) {
            //   console.log(`producttype is not available`);
            //   console.log(results[i]);
            //   results[i].error = "producttype is missing";
            //   const r = reject(results[i]);
            // }
            else if (
              results[i].totalslots == "" ||
              results[i].totalslots == "NA" ||
              results[i].totalslots == "#N/A"
            ) {
              // console.log(`totalslots is not available`);
              // console.log(results[i]);
              results[i].error = "totalslots is missing";
              const r = reject(results[i]);
            } else {
              try {
                const checkMachine = await TableModel.find({
                  machineid: results[i].machineid,
                });
                // console.log("machineslotdata",machineslotdata.length);
                if (checkMachine) {
                  rejectmachinedata(checkMachine);
                  // return res.status(500).send("Machine is already created");
                }

                const warehousedata = await warehouse.findOne({
                  wareHouseName: results[i].warehouse,
                });
                const refillerdata = await TableModelUser.findOne({
                  first_name: results[i].refiller,
                });
                const companydata = await TableModelCompany.findOne({
                  companyid: results[i].companyid,
                });

                let newRow = {
                  machineid: results[i].machineid,
                  machinename: results[i].machinename,
                  companyid: companydata.companyid,
                  warehouse: warehousedata._id,
                  refiller: refillerdata.user_id,
                  // building: results[i].building,
                  location: results[i].location,
                  // producttype: results[i].producttype,
                  totalslots: results[i].totalslots,
                  admin: req.user._id,
                };
                const newData = await TableModel(newRow);
                // console.log(newData);
                await newData.save();
                if (newData) {
                  const r = succ(results[i]);
                }
              } catch (e) {
                // console.log(e);
                if (e.code == 11000) {
                  results[i].error = "Duplicate Entry";
                  const r = reject(results[i]);
                } else {
                  results[i].error = e;
                  const r = reject(results[i]);
                }
              }
            }
          }
          // const r= reject();
          // console.log("storeddata.length", storeddata.length);
          // console.log("rejectdata", rejectdata);
          // console.log("rejectdata.length", rejectdata.length);
          // console.log("rejectmachines", rejectmachines);
          // console.log("rejectmachines", rejectmachines.length);

          if (rejectdata.length > 0) {
            return rc.setResponse(res, {
              success: true,
              msg: "Data Fetched",
              data: {
                dataupload: "partial upload",
                reject_data: rejectdata,
                stored_data: storeddata.length,
              },
            });
          } else {
            return rc.setResponse(res, {
              success: true,
              msg: "Data Fetched",
              data: { dataupload: "success", stored_data: storeddata.length },
            });
          }
        });
    } else {
      return rc.setResponse(res, { error: { code: 403 } });
    }
  } catch (error) {

  }
}

module.exports = { createMachine, getAllMachines, getSingleMachine, updateMachine, deleteMachine, getSampleCSV, bulkUpdateMachine, bulkUploadMachine };



module.exports.addRow = async (newRow) => {
  const data = await newRow.save();
  return data;
};
module.exports.getDataByIdData = async (id) => {
  const data = await Table.findOne(
    { _id: id, delete_status: false },
    { delete_status: 0, last_update: 0, __v: 0 }
  );
  return data;
};
module.exports.getDataByQueryFilterData = async (query) => {
  const data = await Table.find({ query, delete_status: false }, {
    delete_status: 0,
    created_at: 0,
    last_update: 0,
    __v: 0,
  });
  return data;
};
module.exports.getDataByQueryFilterDataOne = async (query) => {
  const data = await Table.findOne(query, {
    delete_status: 0,
    created_at: 0,
    last_update: 0,
    __v: 0,
  });
  return data;
};
module.exports.getDataByQueryFilterDataOneAggregate = async (machineid) => {
  const data = await Table.aggregate([
    // console.log("🚀 role:", machineid),
    {
      $match: {
        $and: [
          { delete_status: false }, // Filter documents with delete_status as false
          { machineid: machineid },
        ]
      }
    },
    {
      $project: {
        _id: 1,
        machineid: 1,
        machinename: 1,
        companyid: 1,
        warehouse: {
          $toObjectId: "$warehouse",
        },
        building: 1,
        location: 1,
        producttype: 1,
        totalslots: 1,
        admin: {
          $toObjectId: "$admin",
        },
        refillerName: 1,
        refiller: 1,
      },
    },
    {
      $lookup: {
        from: "warehouses",
        localField: "warehouse",
        foreignField: "_id",
        as: "warehouseoutput",
      },
    },
    { $unwind: "$warehouseoutput" },
    {
      $lookup: {
        from: "user_infos",
        localField: "refiller",
        foreignField: "user_id",
        as: "refillerOutput",
      },
    },
    { $unwind: "$refillerOutput" },
    {
      $lookup: {
        from: "user_infos",
        localField: "admin",
        foreignField: "_id",
        as: "adminOutput",
      },
    },
    { $unwind: "$adminOutput" },
    {
      $project: {
        _id: 1,
        machineid: 1,
        machinename: 1,
        companyid: 1,
        warehouse: "$warehouseoutput.wareHouseName",
        building: 1,
        location: 1,
        producttype: 1,
        totalslots: 1,
        admin: "$adminOutput.first_name",
        refillerName: "$refillerOutput.first_name",
        refiller: 1,
      },
    },
  ]);
  return data;
};
module.exports.getDataCountByQuery = async (query) => {
  const data = await Table.find({ query, delete_status: false }).count();
  return data;
};
module.exports.getDataListByQuery = async () => {
  const data = await Table.find({ delete_status: false }, { id: 1, machineid: 1, machinename: 1 });
  return data;
};
module.exports.updateByQuery = async (query, newdata) => {
  newdata.last_update = Date.now();
  const data = await Table.findOneAndUpdate(query, { $set: newdata });
  return data;
};
module.exports.dataDeleteByQuery = async (query) => {
  const data = await Table.findOneAndRemove(query);
  return data;
};
module.exports.getDataforTable = async () => {
  const data = Table.aggregate([
    {
      $match: {
        delete_status: false // Filter documents with delete_status as false
      }
    },
    {
      $project: {
        _id: 1,
        machineid: 1,
        // companyid: 1,
        // companyName: 1,
        machinename: 1,
        // location: 1,
        totalslots: 1,
        warehouse: {
          $toObjectId: "$warehouse",
        },
        admin: {
          $toObjectId: "$admin",
        },
        refiller: 1,
        created_at: 1,
      },
    },
    {
      $lookup: {
        from: "user_infos",
        localField: "admin",
        foreignField: "_id",
        as: "output",
      },
    },
    { $unwind: "$output" },
    {
      $lookup: {
        from: "user_infos",
        localField: "refiller",
        foreignField: "user_id",
        as: "outputRefiller",
      },
    },
    { $unwind: "$outputRefiller" },
    {
      $lookup: {
        from: "warehouses",
        localField: "warehouse",
        foreignField: "_id",
        as: "warehouseoutput",
      },
    },
    { $unwind: "$warehouseoutput" },
    // {
    //   $lookup: {
    //     from: "companies",
    //     localField: "companyid",
    //     foreignField: "companyid",
    //     as: "outputCompany",
    //   },
    // },
    // { $unwind: "$outputCompany" },
    {
      $project: {
        _id: 1,
        machine_id: "$machineid",
        // total_slots: "$totalslots",
        machine_name: "$machinename",
        // company_id: "$companyid",
        // companyName: "$outputCompany.companyname",
        // location: "$location",
        warehouse: "$warehouseoutput.wareHouseName",
        created_by: "$output.first_name",
        refiller: "$outputRefiller.first_name",
        created_at: {
          $dateToString: {
            format: "%Y-%m-%d %H:%M:%S",
            date: "$created_at",
            timezone: "Asia/Kolkata",
          },
        },
      },
    },
  ]);

  return data;
};
