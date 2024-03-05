

//CREATE SLOT FOR PERTICULAR MACHINE
const addSlot = async (req, res, next) => {
    try {
        const query = {
            role: req.user.role,
        };
        var pdata = await TableModelPermission.getDataByQueryFilterDataOne(query);
        if (pdata.addnewmachine) {
            const query = {
                machineid: req.body.machineid,
            };
            var cdata = await TableModel.getDataByQueryFilterDataOne(query);
            // console.log(cdata);
            // console.log("🚀 ~ file: r_company.js:195 ~ cdata", cdata)
            if (!cdata) {
                return rc.setResponse(res, {
                    msg: "Machine not Found",
                });
            } else {
                const productdata = await product.findOne({
                    productname: req.body.product,
                });
                var newRow = req.body;
                newRow.created_by = req.user.id;
                newRow.machineid = cdata.id;
                newRow.admin = req.user.id;
                newRow.machineName = cdata.machineid;
                newRow.product = productdata._id;
                newRow = new TableModelMachineSlot(newRow);
                // console.log(newRow);

                if (!newRow) {
                    return rc.setResponse(res, {
                        msg: "No Data to insert",
                    });
                }
                const data = await TableModelMachineSlot.addRow(newRow);
                if (data) {
                    return rc.setResponse(res, {
                        success: true,
                        msg: "Data Inserted",
                        data: data,
                    });
                }
            }
        } else {
            return rc.setResponse(res, { error: { code: 403 } });
        }
    } catch (error) {

    }
}

// GET ALL SLOTS (PERTICULAR MACHINE)
const getAllSlotsByMachine = async (req, res, next) => {
    try {
        const query = {
            role: req.user.role,
        };
        var cdata = await TableModelPermission.getDataByQueryFilterDataOne(query);
        if (cdata.addnewmachine) {
            let _id = req.params.slotid;
            // console.log("🚀 ~ file: r_company.js:276 ~ slote _id", _id);
            const data = await TableModelMachineSlot.getDataForEditFormAssignUser(
                _id
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
        } else {
            return rc.setResponse(res, { error: { code: 403 } });
        }
    } catch (error) {

    }
}

// GET SINGLE SLOT
const getSingleSlot = async (req, res, next) => {
    try {
        const query = {
            role: req.user.role,
        };
        var cdata = await TableModelPermission.getDataByQueryFilterDataOne(query);
        if (cdata.addnewmachine) {
            const query = {
                _id: req.params.id, delete_status: false
            };
            var cdata = await TableModel.getDataByQueryFilterDataOne(query);
            if (cdata.machineid) {
                const machineid = cdata.id;
                const data = await TableModelMachineSlot.getDataforTable(machineid);
                // console.log(data);
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

// GET SINGLE SLOT
const updateSlot = async (req, res, next) => {
    try {
        const query = {
            role: req.user.role,
        };
        var pdata = await TableModelPermission.getDataByQueryFilterDataOne(query);
        if (pdata.addnewmachine) {
            let query = {
                machineid: req.body.machineid,
            };
            var cdata = await TableModel.getDataByQueryFilterDataOne(query);
            // console.log("🚀 ~ file: r_machine.js:242 ~ cdata:", cdata);
            if (!cdata) {
                return rc.setResponse(res, {
                    msg: "Machine not Found",
                });
            } else {
                const productdata = await product.findOne({
                    productname: req.body.product,
                });
                let newRow = req.body;
                newRow.created_by = req.user.id;
                newRow.machineid = cdata.id;
                newRow.product = productdata._id;
                // console.log(newRow);
                query = {
                    _id: req.params.id,
                };
                let data = await TableModelMachineSlot.updateByQuery(query, newRow);
                if (!data) {
                    return rc.setResponse(res, {
                        msg: "No Data to update",
                    });
                } else {
                    return rc.setResponse(res, {
                        success: true,
                        msg: "Machine Updated",
                        data: newRow,
                    });
                }
            }
        } else {
            return rc.setResponse(res, { error: { code: 403 } });
        }
    } catch (error) {

    }
}

// GET SINGLE SLOT
const deleteSlot = async (req, res, next) => {
    try {
        const query = {
            role: req.user.role,
        };
        var pdata = await TableModelPermission.getDataByQueryFilterDataOne(query);
        if (pdata.addnewmachine) {
            let query = {
                _id: req.params.id,
            };
            // var data = await TableModelMachineSlot.dataDeleteByQuery(query);
            const data = await TableModelMachineSlot.updateByQuery(query, { delete_status: true });
            if (!data) {
                return rc.setResponse(res, {
                    msg: "Slot not Found",
                });
            } else {
                return rc.setResponse(res, {
                    success: true,
                    msg: "Data Deleted",
                    data: data,
                });
            }
        } else {
            return rc.setResponse(res, { error: { code: 403 } });
        }

    } catch (error) {

    }
}

// GET CSV SAMPLE FILE
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

// Need to work on it
const bulkUpdateSlot = async (req, res, next) => {
    try {

    } catch (error) {

    }
}

// BULK UPLOAD SLOT USING CSV FILE
const bulkUploadSlot = async (req, res, next) => {
    try {

    } catch (error) {

    }
}

module.exports = {
    addSlot, getAllSlotsByMachine, getSingleSlot, updateSlot,
    deleteSlot, getSampleCSV, bulkUpdateSlot, bulkUploadSlot
};


//------------------------get all slot details by machine Name------------------//
router.get(
    "/getallmachineslots",
    validator.query(getAllMachineSlots),
    auth,
    asyncHandler(async (req, res) => {
        const query = {
            role: req.user.role,
        };
        const permissions = await TableModelPermission.getDataByQueryFilterDataOne(
            query
        );
        if (!permissions.listMachineSlot) {
            return rc.setResponse(res, {
                success: false,
                msg: "No permisson to find data",
                data: {},
            });
        }
        const data = await machineslot
            .find({ machineid: req.query.machineid, delete_status: false })
            .select(
                "_id slot machineid machineName machineid slot maxquantity sloteid closingStock product created_at"
            )
            .lean();
        const machine = await machines
            .findOne({ _id: req.query.machineid, delete_status: false })
            .select("cash totalSalesCount totalSalesValue");
        // console.log('machine: ', machine);
        // console.log("data", data);
        let productdata;
        let pdata = [];
        let sendData;
        let ss = [];
        for (let i = 0; i < data.length; i++) {
            productdata = await product
                .findOne({ _id: data[i].product, delete_status: false })
                .select("productid productname sellingprice")
                .lean();
            // console.log('productdata: ', productdata);
            pdata.push(productdata);

            sendData = {
                _id: data[i]._id,
                machineid: data[i].machineid,
                machineName: data[i].machineName,
                slot: data[i].slot,
                maxquantity: data[i].maxquantity,
                // active_status: data[i].active_status,
                productid: pdata[i]._id,
                productname: `${pdata[i].productname} - ${pdata[i].sellingprice}Rs`,
                productprice: pdata[i].sellingprice,
                sloteid: data[i].sloteid,
                closingStock: data[i].closingStock,
                currentStock: null,
                refillQuantity: null,
                saleQuantity: null,
                // delete_status: data[i].delete_status,
                created_at: data[i].created_at,
            };
            ss.push(sendData);
        }
        ss.sort((a, b) => a.slot - b.slot);
        // console.log("ss", ss);
        const machinedata = {
            machineId: data[0].machineid,
            machineName: data[0].machineName,
            machineSlot: ss,
            cash: machine.cash,
            totalSalesCount: machine.totalSalesCount,
            totalSalesValue: machine.totalSalesValue,
        };
        // console.log('machinedata: ', machinedata);
        return rc.setResponse(res, {
            success: true,
            msg: "Data fetched",
            data: machinedata,
        });
    })
);

// sample csv file for bulk upload slots
router.get(
    "/MachineSlot/SampleCSV",
    auth,
    asyncHandler(async (req, res) => {
        // console.log("----------------xdxdxgxg--------");
        const query = {
            role: req.user.role,
        };
        // console.log(query);
        let cdata = await TableModelPermission.getDataByQueryFilterDataOne(query);
        // console.log(cdata);
        if (cdata.updatebulkproduct) {
            const j = {
                machineid: "",
                slot: "",
                maxquantity: "",
                product: "",
            };
            const csvFields = ["machineid", "slot", "maxquantity", "product"];
            const csvParser = new CsvParser({ csvFields });
            const csvdata = csvParser.parse(j);
            res.setHeader("Content-Type", "text/csv");
            res.setHeader(
                "Content-Disposition",
                "attachment; filename=SampleImportMachineSLot.csv"
            );
            res.status(200).end(csvdata);
        } else {
            return rc.setResponse(res, { error: { code: 403 } });
        }
    })
);

// bulk Upload Slots
router.post(
    "/MachineSlot/ImportCSV",
    auth,
    upload.single("file"),
    asyncHandler(async (req, res) => {
        const results = [];
        var rejectdata = [];

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
                            results[i].slot == "" ||
                            results[i].slot == "NA" ||
                            results[i].slot == "#N/A"
                        ) {
                            // console.log(`Slot is not available`);
                            // console.log(results[i]);
                            results[i].error = "Slot is missing";
                            const r = reject(results[i]);
                        } else if (
                            results[i].maxquantity == "" ||
                            results[i].maxquantity == "NA" ||
                            results[i].maxquantity == "#N/A"
                        ) {
                            // console.log(`Max_Quantity is not available`);
                            // console.log(results[i]);
                            results[i].error = "Max_Quantity is missing";
                            const r = reject(results[i]);
                        } else if (
                            results[i].product == "" ||
                            results[i].product == "NA" ||
                            results[i].product == "#N/A"
                        ) {
                            // console.log(`Product is not available`);
                            // console.log(results[i]);
                            results[i].error = "Product is missing";
                            const r = reject(results[i]);
                        } else {
                            try {
                                // const machineslotdata = await machineslot.find({ $and:[{machineid: results[i].machineid}, {slot: results[i].slot}]})
                                // console.log("machineslotdata",machineslotdata.length);
                                // if(machineslotdata.length > 0){
                                //   return res.status(500).send("Slot is already created");
                                // }

                                // let newRow = new machineslot(results[i]);

                                const productdata = await product.findOne({
                                    productname: results[i].product,
                                });
                                const machinedata = await machines.findOne({
                                    machineid: results[i].machineid,
                                });
                                let newRow = {
                                    machineid: machinedata._id,
                                    slot: results[i].slot,
                                    maxquantity: results[i].maxquantity,
                                    product: productdata._id,
                                    machineName: machinedata.machineid,
                                    created_by: req.user.id,
                                    admin: req.user.id,
                                };
                                const newData = await machineslot(newRow);
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
                        // res.status(200).json({ "dataupload": "error", "reject_data": rejectdata, "stored_data": storeddata.length });
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
    })
);

// Export all slots of machine
router.get(
    "/MachineSlot/ExportCSV",
    auth,
    asyncHandler(async (req, res) => {
        var trans = [];
        function transaction(x) {
            if (x) {
                trans.push(x);
            }
            return trans;
        }
        const query = {
            role: req.user.role,
        };
        var cdata = await TableModelPermission.getDataByQueryFilterDataOne(query);
        if (cdata.bulkproductupload) {
            let data = await machineslot.find({ machineName: req.query.machine });
            // console.log("🚀 ~ file: r_product.js:30 ~ data:", data)
            if (!(data.length == 0)) {
                for (i = 0; i < data.length; i++) {
                    let productdata = await product.findOne({ _id: data[i].product });
                    let admin = await user_infos.findOne({ _id: data[i].admin });
                    // console.log("productdata",productdata)
                    const j = {
                        machineName: data[i].machineName,
                        slot: data[i].slot,
                        product: productdata.productname,
                        maxquantity: data[i].maxquantity,
                        admin: admin.first_name,
                        closingStock: data[i].closingStock,
                        currentStock: data[i].currentStock,
                        saleQuantity: data[i].saleQuantity,
                    };
                    //  console.log(j);
                    transaction(j);
                    // console.log(trans);
                }
                const csvFields = [
                    "machineName",
                    "slot",
                    "product",
                    "maxquantity",
                    "admin",
                    "closingStock",
                    "currentStock",
                    "saleQuantity",
                ];
                const csvParser = new CsvParser({ csvFields });
                const csvData = csvParser.parse(trans);
                res.setHeader("Content-Type", "text/csv");
                res.setHeader(
                    "Content-Disposition",
                    "attachment; filename=MachineSlots.csv"
                );
                res.status(200).end(csvData);
            } else {
                return rc.setResponse(res, {
                    msg: "Data not Found",
                });
            }
        } else {
            return rc.setResponse(res, { error: { code: 403 } });
        }
    })
);

// get request pagination machineslots data
router.get(
    "/Machine/Slot/Table/:machineid/:page/:dataperpage",
    auth,
    asyncHandler(async (req, res, next) => {
        const page = req.params.page;
        const dataperpage = req.params.dataperpage;
        const query = {
            role: req.user.role,
        };
        var cdata = await TableModelPermission.getDataByQueryFilterDataOne(query);
        if (cdata.productlist) {
            const machinedata = await machines.findOne({
                machineid: req.params.machineid,
            });
            // console.log("machinedata:", machinedata);
            const admin = req.user.id;
            const data = await machineslot.getDataforTablePagination(
                machinedata.machineid,
                page,
                dataperpage
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
        } else {
            return rc.setResponse(res, { error: { code: 403 } });
        }
    })
);

router.get(
    "/refillSheet",
    auth,
    asyncHandler(async (req, res) => {
        try {
            let filter = {};
            if (req.query.refiller) {
                filter = { refiller: req.query.refiller };
            }
            const machinesData = await machines.find({
                ...filter,
                delete_status: false,
            });
            // console.log('machinesData: ', machinesData);
            const machineIds = machinesData.map((machine) => machine.machineid);
            const machinename = machinesData.map((machine) => machine.machinename);
            const machineslotdata = await machineslot
                .find({ machineName: { $in: machineIds }, delete_status: false })
                .select("machineName slot product closingStock");
            const productIds = [
                ...new Set(machineslotdata.map((slot) => slot.product)),
            ];
            const productData = await product.find({
                _id: { $in: productIds },
                delete_status: false,
            });
            const productMap = new Map(
                productData.map((product) => [product._id.toString(), product])
            );

            const machineDataMap = new Map();
            machineslotdata.forEach((slot) => {
                const machineName = slot.machineName;
                if (!machineDataMap.has(machineName)) {
                    machineDataMap.set(machineName, []);
                }
                // console.log(slot.closingStock);
                try {
                    // if (slot.closingStock) {
                    machineDataMap.get(machineName).push({
                        slot: slot?.slot,
                        product: productMap?.get(slot.product.toString())?.productname,
                        closingStock: slot?.closingStock,
                    });
                    // }
                } catch (error) {
                    // console.log(error);
                    return rc.setResponse(res, {
                        success: false,
                        msg: `Closing stock not found for machine '${machineName}'.`,
                    });
                }
            });
            // console.log("machineDataMap: ", machineDataMap);

            const groupedData = Array.from(
                machineDataMap,
                ([machineName, stock]) => ({
                    machineName,
                    stock,
                })
            );
            // console.log("groupedData: ", groupedData);
            groupedData.forEach((item) => {
                const machine = machinesData.find(
                    (m) => m.machineid === item.machineName
                );
                if (machine) {
                    item.machineName = machine.machinename;
                }
            });

            return rc.setResponse(res, {
                success: true,
                msg: "Data fetched",
                data: groupedData,
            });
        } catch (error) {
            console.error("Error:", error);
            return rc.setResponse(res, {
                success: false,
                msg: "An error occurred while fetching data.",
            });
        }
    })
);

router.get(
    "/refillSheetExportCSV",
    asyncHandler(async (req, res) => {
        const refillfile = [];
        function pushData(x) {
            if (x) {
                refillfile.push(x);
            }
            return refillfile;
        }
        try {
            let filter = {};
            if (req.query.refiller) {
                filter = { refiller: req.query.refiller };
            }
            if (req.query.warehouse) {
                filter = { warehouse: req.query.warehouse };
            }
            if (req.query.machineid) {
                filter = { _id: req.query.machineid };
            }
            const machinesData = await machines.find({
                ...filter,
                delete_status: false,
            });
            const machineIds = machinesData.map((machine) => machine.machineid);
            const machineDataMap = new Map();

            const warehouseIds = machinesData.map((machine) => machine.warehouse);
            const warehouseData = await warehouseTable.find({
                _id: { $in: warehouseIds },
            });
            const warehouseMap = new Map(
                warehouseData.map((w) => [w._id.toString(), w.wareHouseName])
            );

            const machineNames = machinesData.map((machine) => machine.machinename);
            const machineNameData = await machines.find({
                machinename: { $in: machineNames },
            });
            const machineNameMap = new Map(
                machineNameData.map((m) => [m.machinename, m.machinename])
            );

            const refillerIds = machinesData.map((machine) => machine.refiller);
            const refillerData = await user_infos.find({
                user_id: { $in: refillerIds },
            });
            const refillerMap = new Map(
                refillerData.map((u) => [u.user_id.toString(), u.first_name])
            );

            machinesData.forEach((machine) => {
                machineDataMap.set(machine.machineid, {
                    warehouse: warehouseMap.get(machine.warehouse),
                    machineName: machineNameMap.get(machine.machinename),
                    refiller: refillerMap.get(machine.refiller),
                });
            });
            const machineslotdata = await machineslot
                .find({ machineName: { $in: machineIds } })
                .select("machineName slot product closingStock created_at last_update");
            const productIds = [
                ...new Set(machineslotdata.map((slot) => slot.product)),
            ];
            const productData = await product.find({ _id: { $in: productIds } });
            const productMap = new Map(
                productData.map((product) => [product._id.toString(), product])
            );
            sendData = machineslotdata.map((slot) => {
                const machineData = machineDataMap.get(slot.machineName);
                return {
                    machineName: machineData?.machineName,
                    warehouse: machineData?.warehouse,
                    refiller: machineData?.refiller,
                    product: productMap?.get(slot.product.toString())?.productname,
                    slot: slot?.slot,
                    closingStock: slot?.closingStock,
                };
            });
            let data;
            for (let i = 0; i < sendData.length; i++) {
                data = {
                    machineName: sendData[i]?.machineName,
                    warehouse: sendData[i]?.warehouse,
                    refiller: sendData[i]?.refiller,
                    product: sendData[i]?.product,
                    slot: sendData[i]?.slot,
                    closingStock: sendData[i]?.closingStock,
                };
                pushData(data);
            }
            const csvFields = [
                "machineName",
                "slot",
                "product",
                "closingStock",
                "warehouse",
                "refiller",
            ];
            const csvParser = new CsvParser({ csvFields });
            const csvData = csvParser.parse(refillfile);
            res.setHeader("Content-Type", "text/csv");
            res.setHeader(
                "Content-Disposition",
                "attachment; filename=public/refillFile.csv"
            );
            res.status(200).end(csvData);
        } catch (error) {
            console.error("Error:", error);
            return rc.setResponse(res, {
                success: false,
                msg: "An error occurred while fetching data.",
            });
        }
    })
);