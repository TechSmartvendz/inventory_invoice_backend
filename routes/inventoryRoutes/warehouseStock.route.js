const { Router } = require("express");
const { addWareHouseStock } = require("../../controllers/inventoryControllers/warehouseStock");

const warehouseStockRouter = Router()
// this routes for warehouse stock

// add warehouse stock
warehouseStockRouter.post("/addstock", addWareHouseStock);

// get all warehouseStock
warehouseStockRouter.get(
    "/getall",
    auth,
    asyncHandler(async (req, res, next) => {
        const query = {
            role: req.user.role,
        };
        var cdata = await TableModelPermission.getDataByQueryFilterDataOne(query);
        if (cdata.listStock) {
            const data = await warehouseStock
                .find({ isDeleted: false })
                .select("warehouse product productQuantity sellingPrice ")
                .populate("warehouse")
                .populate("product");
            // console.log(data);
            let sendData = [];
            if (data) {
                for (let i = 0; i < data.length; i++) {
                    sendData.push({
                        _id: data[i]._id,
                        product: data[i].product.productname,
                        warehouse: data[i].warehouse.wareHouseName,
                        productQuantity: data[i].productQuantity,
                        sellingPrice: data[i].product.sellingprice,
                    });
                }
                return rc.setResponse(res, {
                    success: true,
                    msg: "Data Fetched",
                    data: sendData,
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

// get warehouseStocks by id
warehouseStockRouter.get(
    "/getWarehouseStock/:_id",
    auth,
    asyncHandler(async (req, res, next) => {
        const query = {
            role: req.user.role,
        };
        var cdata = await TableModelPermission.getDataByQueryFilterDataOne(query);
        if (cdata.listStock) {
            const data = await warehouseStock
                .find({ warehouse: req.params._id, isDeleted: false })
                .select("warehouse product productQuantity sellingPrice ")
                .populate("warehouse")
                .populate("product");
            // console.log(data);
            let sendData = [];
            if (data) {
                for (let i = 0; i < data.length; i++) {
                    sendData.push({
                        _id: data[i]._id,
                        product: data[i].product.productname,
                        warehouse: data[i].warehouse.wareHouseName,
                        productQuantity: data[i].productQuantity,
                        sellingPrice: data[i].sellingPrice,
                    });
                }
                return rc.setResponse(res, {
                    success: true,
                    msg: "Data Fetched",
                    data: sendData,
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

// Update warehouseStock
warehouseStockRouter.put(
    "/updateWareHouseStock/:_id",
    auth,
    asyncHandler(async (req, res) => {
        const query = {
            role: req.user.role,
        };
        let cdata = await TableModelPermission.getDataByQueryFilterDataOne(query);
        if (!cdata) {
            return rc.setResponse(res, {
                success: false,
                msg: "no permission to update warehouse",
            });
        } else {
            const rid = req.params._id;
            const pararms = req.body;
            const updatedata = await warehouseStock.findByIdAndUpdate(rid, pararms);
            return rc.setResponse(res, {
                success: true,
                msg: "data updated",
                data: updatedata,
            });
        }
    })
);

// deleteWarehouse Stock
warehouseStockRouter.put(
    "/deleteWareHouseStock/:id",
    auth,
    asyncHandler(async (req, res) => {
        const query = {
            role: req.user.role,
        };
        let cdata = await TableModelPermission.getDataByQueryFilterDataOne(query);
        if (!cdata) {
            return rc.setResponse(res, {
                success: false,
                msg: "no permission to delete warehouse",
            });
        } else {
            const rid = req.params._id;
            // const pararms = req.body;
            const updatedata = await warehouseStock.findByIdAndUpdate(rid, {
                isDeleted: true,
            });
            return rc.setResponse(res, {
                success: true,
                msg: "WarehouseStock deleted",
            });
        }
    })
);

module.exports = { warehouseStockRouter }