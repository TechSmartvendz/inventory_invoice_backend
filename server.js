const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require("cors");
const { connection } = require('./config/db');
//import all routers
// inventory routes
const { warehouseRouter } = require('./routes/inventoryRoutes/warehouse.route');
const { areaRouter } = require('./routes/inventoryRoutes/area.route');
const { AuthRouter } = require('./routes/inventoryRoutes/auth.route');
const { companyRouter } = require('./routes/inventoryRoutes/company.route');
const { machineRouter } = require('./routes/inventoryRoutes/machine.route.');
const { productRouter } = require('./routes/inventoryRoutes/product.route');
const { refillRequestRouter } = require('./routes/inventoryRoutes/refillerRequest.route');
const { slotsRouter } = require('./routes/inventoryRoutes/slots.route');
const { supplierRouter } = require('./routes/inventoryRoutes/suppllier.route');
const { unitRouter } = require('./routes/inventoryRoutes/unit.route');
const { usersRouter } = require('./routes/inventoryRoutes/user.route');
const { warehouseStockRouter } = require('./routes/inventoryRoutes/warehouseStock.route');
//invoice routes
const { usersRouter:invoiceuserRouter } = require('./routes/invoiceRoutes/users.route');
const { productRouter:invoiceproductRouter } = require('./routes/invoiceRoutes/product.route');
const { taxRouter } = require('./routes/invoiceRoutes/tax.route');
const { paymentTermRouter } = require('./routes/invoiceRoutes/paymentTerm.route');
const { invoiceRouter } = require('./routes/invoiceRoutes/invoice.route');
const { customerRouter } = require('./routes/invoiceRoutes/customer.route');
const { tdsRouter } = require('./routes/invoiceRoutes/tds.route');


const app = express();

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors
    ({
        credentials: true,
        origin: 'http://localhost:3000'
    })
);

// For Checking Server is working or not
app.get("/", (req, res) => {
    try {
        res.send("Server is Working...!")
    } catch (error) {
        console.log('error: ', error);
    }
})

// API ROUTES
// Inventory ------------------------------------->
app.use("/api/inventory/area",areaRouter );
app.use("/api/inventory/auth", AuthRouter);
app.use("/api/inventory/company", companyRouter);
app.use("/api/inventory/machine", machineRouter);
app.use("/api/inventory/product", productRouter);
app.use("/api/inventory/refillerrequest", refillRequestRouter);
app.use("/api/inventory/slot", slotsRouter);
app.use("/api/inventory/supplier", supplierRouter);
app.use("/api/inventory/unit", unitRouter);
app.use("/api/inventory/user", usersRouter); 
app.use("/api/inventory/warehouse", warehouseRouter);
app.use("/api/inventory/warehousestock", warehouseStockRouter);
app.use("/api/inventory/warehousestocktransafer", warehouseStockRouter);

// Invoice Routes --------------------------------->

app.use("/api/invoice/customers", customerRouter);
app.use("/api/invoice/invoices", invoiceRouter);
app.use("/api/invoice/paymentterms", paymentTermRouter);
app.use("/api/invoice/product", invoiceproductRouter);
app.use("/api/invoice/tax", taxRouter);
app.use("/api/invoice/tds", tdsRouter);
app.use("/api/invoice/units", unitRouter);
app.use("/api/invoice/users", invoiceuserRouter);

//error hadnling middleware
app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    });
})

app.listen(process.env.PORT, async () => {
    try {
        await connection;  // this connection is for Database , check in config folder
        console.log("Application Listening port 8080");
    }
    catch (error) {
        console.log(error);
    }
})

