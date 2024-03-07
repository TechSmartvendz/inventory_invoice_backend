const { Router } = require("express");
const { getSingleUser, updateUser, getAllUser, deleteUser }=require("../../controllers/inventoryControllers/users")

const usersRouter = Router();

//GET SINGLE USER
usersRouter.get("/single/:id", getSingleUser);

//GET ALL USERS
usersRouter.get("/",  getAllUser);

//UPDATE USER
usersRouter.put("/update/:id",  updateUser);

// DELETE USER
usersRouter.delete("/delete/:id",  deleteUser);


module.exports = { usersRouter }