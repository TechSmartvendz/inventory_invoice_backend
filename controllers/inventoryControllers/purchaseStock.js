module.exports.addRow = async (newRow) => {
    const data = await newRow.save();
    return data;
  };
  
  module.exports.getDataforTablePagination = async (page, dataperpage) => {
    const skipdata = page * dataperpage - dataperpage;
    const dp = parseInt(dataperpage);
    let end = skipdata + parseInt(dataperpage);
    const data = await Table.aggregate([
      // { $sort: { created_at: -1 } },
      {
        $facet: {
          metadata: [
            { $count: "count" },
            {
              $addFields: { start: skipdata + 1, end: end, page: parseInt(page) },
            },
          ],
          data: [
            { $skip: skipdata },
            { $limit: dp },
            {
              $project: {
                _id: 1,
                productName: {
                  $toObjectId: "$product",
                },
                warehouse: {
                  $toObjectId: "$warehouse",
                },
                supplier: {
                  $toObjectId: "$supplier",
                },
                productQuantity: 1,
                sellingPrice: 1,
                totalPrice: 1,
                invoiceNumber: 1,
                GRN_Number: 1,
                date: 1,
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
                from: "products",
                localField: "productName",
                foreignField: "_id",
                as: "productoutput",
              },
            },
            { $unwind: "$productoutput" },
            {
              $lookup: {
                from: "suppliers",
                localField: "supplier",
                foreignField: "_id",
                as: "supplieroutput",
              },
            },
            { $unwind: "$supplieroutput" },
            {
              $project: {
                _id: 1,
                productName: "$productoutput.productname",
                warehouse: "$warehouseoutput.wareHouseName",
                supplier: "$supplier.supplierName",
                productQuantity: 1,
                sellingPrice: 1,
                totalPrice: 1,
                invoiceNumber: 1,
                GRN_Number: 1,
                date: {
                  $dateToString: {
                    format: "%Y-%m-%d %H:%M:%S",
                    date: "$date",
                    timezone: "Asia/Kolkata",
                  },
                },
              },
            },
          ],
        },
      },
    ]);
    const jsonData = {
      metadata: data[0].metadata[0],
      data: data[0].data,
    };
  
    return jsonData;
  };