const express = require("express");
const {getAllTeamsController, getTeamByIdController, addTeamController, updateTeamController, deleteTeamController} = require("../controllers/team.controller");
const { verifyAdmin } = require("../utils/verifyToken");

const teamRouter = express.Router();   

teamRouter.get("/", verifyAdmin, getAllTeamsController)
teamRouter.get("/:id", verifyAdmin, getTeamByIdController)
teamRouter.post("/", verifyAdmin, addTeamController)
teamRouter.put("/:id", verifyAdmin, updateTeamController)
teamRouter.delete("/:id", verifyAdmin, deleteTeamController)



module.exports = teamRouter;