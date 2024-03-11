const { Router } = require("express");
const { register, login } = require("../../controllers/inventoryControllers/auth");
const { verifyAdmin } = require("../../middlewares/inventoryMiddleware/checkUserRole");

const AuthRouter = Router();

AuthRouter.post("/register", verifyAdmin, register);
AuthRouter.post("/login", login);

module.exports = { AuthRouter }