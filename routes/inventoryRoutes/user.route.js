const { Router } = require("express");
const { getSingleUser, updateUser, getAllUser, deleteUser }=require("../../controllers/inventoryControllers/users")

const usersRouter = Router();
//GET ALL USERS
usersRouter.get("/",  getAllUser);

//UPDATE USER
usersRouter.put("/:id",  updateUser);

// DELETE USER
usersRouter.delete("/:id",  deleteUser);

//GET SINGLE USER
usersRouter.get("/:id", getSingleUser);

module.exports = { usersRouter }