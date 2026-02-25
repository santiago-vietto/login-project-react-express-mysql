const express = require("express");
const {getAllUsersController, getUserByIdController, updateUserController, deleteUserController, getMyUserController} = require("../controllers/user.controller");
const userRouter = express.Router();   
const { verifyToken, verifyUser, verifyAdmin } = require("../utils/verifyToken");
const checkUserParams = require("../utils/checkUserParams");


userRouter.get("/", verifyAdmin, getAllUsersController)
userRouter.get("/me", verifyToken, getMyUserController)
userRouter.get("/:id", verifyUser, getUserByIdController)
userRouter.put("/:id", verifyUser, checkUserParams, updateUserController)
userRouter.delete("/:id", verifyAdmin, deleteUserController)


userRouter.get("/checkauthentication/:id", verifyToken, (req, res, next)=>{
    res.status(200).json({message: "Hola usuario, estas loggeado :)" })
});

userRouter.get("/checkuser/:id", verifyUser, (req, res, next)=>{
    return res.status(200).json({message: "Hola usuario, estas loggeado y puedes ver y actualizar tu cuenta :)" })
});

userRouter.get("/checkadmin/:id", verifyAdmin, (req, res, next)=>{
    res.status(200).json({message: "Hola Admin, estas loggeado y puedes ver y eliminar todas las cuentas :)" })
});


module.exports = userRouter;