const { ProductModel } = require("../../models/inventoryModels/product.model");
const { sampleCsvFileDownload } = require("../../utils/csvFileDownloader");

const addProduct = async (req, res, next) => {
  const payload = req.body;
  try {
    const product = new ProductModel({ createdBy: req.user.id, ...payload })
    const savedProduct = await product.save();
    return res.status(200)
      .send({
        success: true,
        message: "Product has been created!",
        savedProduct
      })
  } catch (error) {
    return next(error)
  }
}

const getAllProducts = async (req, res, next) => {
  try {
    const products = await ProductModel.find({ isDeleted: false })
    return res.status(200)
      .send({
        success: true,
        products,
      });
  } catch (error) {
    return next(error)
  }
}

const getAllProductsByWarehouseId = async (req, res, next) => {
  try {
    const warehouseId = req.params.warehouseId;

    // Query the database to fetch product list for the specified warehouse
    const productsForWarehouse = await WarehouseStock.aggregate([
      {
        $match: { warehouse: mongoose.Types.ObjectId(warehouseId) }
      },
      {
        $lookup: {
          from: 'products', // Assuming 'products' is the name of the products collection
          localField: 'product',
          foreignField: '_id',
          as: 'productDetails'
        }
      },
      {
        $unwind: '$productDetails'
      },
      {
        $group: {
          _id: '$warehouse',
          warehouseName: { $first: '$warehouseDetails.name' },
          products: {
            $push: {
              productId: '$productDetails._id',
              productName: '$productDetails.name',
              quantity: '$quantity'
            }
          }
        }
      }
    ]);

    res.json(productsForWarehouse);
  } catch (error) {
    console.error('Error fetching product list for warehouse:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

const getAllProductsListWarehouseWise = async (req, res, next) => {
  try {
    //  Query the database to fetch product list grouped by warehouse
    const productsByWarehouse = await WarehouseStock.aggregate([
      {
        $lookup: {
          from: 'products', // Assuming 'products' is the name of the products collection
          localField: 'product',
          foreignField: '_id',
          as: 'productDetails'
        }
      },
      {
        $lookup: {
          from: 'warehouses', // Assuming 'warehouses' is the name of the warehouses collection
          localField: 'warehouse',
          foreignField: '_id',
          as: 'warehouseDetails'
        }
      },
      {
        $unwind: '$productDetails'
      },
      {
        $unwind: '$warehouseDetails'
      },
      {
        $group: {
          _id: '$warehouse',
          warehouseName: { $first: '$warehouseDetails.name' },
          products: {
            $push: {
              productId: '$productDetails._id',
              productName: '$productDetails.name',
              quantity: '$quantity'
            }
          }
        }
      }
    ]);

    res.json(productsByWarehouse);
  } catch (error) {
    console.error('Error fetching product list warehouse-wise:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

const getSingleProduct = async (req, res, next) => {
  const { id } = req.params;
  try {
    const product = await ProductModel.findOne({
      _id: id,
      isDeleted: true
    })
    if (!product) {
      return res.status(201)
        .send({
          success: false,
          message: "Product is not Found!",
          id
        });
    }
    return res.status(200)
      .send({
        success: true,
        product,
      });
  } catch (error) {
    return next(error)
  }
}

const updateProduct = async (req, res, next) => {
  const { id } = req.params;
  const payload = req.body;
  // console.log('payload: ', payload);
  try {
    const updatedProduct = await ProductModel.findByIdAndUpdate(id, { $set: payload }, { new: true });
    return res.status(200)
      .json({
        success: true,
        message: "Product Updated Successfully",
        updatedProduct,
      });
  }
  catch (err) {
    return next(err)
  }
}

const deleteProduct = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedProduct = await ProductModel.findByIdAndUpdate(id, { $set: { isDeleted: true } }, { new: true });
    return res.status(200)
      .json({
        success: true,
        message: "Product Deleted Successfully",
        productName: deletedProduct.productName,
      });
  }
  catch (err) {
    return next(err)
  }
}

// GET CSV SAMPLE
const getSampleCSV = async (req, res, next) => {
  try {
    const columnHeadings = ['Name,Profession']
    const csvFile = sampleCsvFileDownload(res, columnHeadings)
    return res.status(200)
      .end(csvFile);
  }
  catch (error) {
    return next(error)
  }
}

const bulkUpdateProduct = async (req, res, next) => {
  try {

  } catch (error) {

  }
}

const bulkUploadProduct = async (req, res, next) => {
  try {

  } catch (error) {

  }
}


module.exports = { addProduct, getAllProducts, getSingleProduct, getAllProductsByWarehouseId, getAllProductsListWarehouseWise, updateProduct, deleteProduct, getSampleCSV, bulkUpdateProduct, bulkUploadProduct };
