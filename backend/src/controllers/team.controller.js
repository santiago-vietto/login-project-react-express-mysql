const {getAllTeamsService, getTeamByIdService, addTeamService, updateTeamService, deleteTeamService} = require("../services/team.service")

const getAllTeamsController = async (_, response) => {
    const allTeams = await getAllTeamsService()

    response.json(allTeams);
}

const getTeamByIdController = async (request, response) => {

    const {id} = request.params;

    const team = await getTeamByIdService(id);

    response.json(team);
}

const addTeamController = async (request, response) => {
    
    const newTeam = request.body;

    const message = await addTeamService(newTeam);

    response.json(message);
}

const updateTeamController = async (request, response) => {
    
    const {id} = request.params;
    const teamToUpdate = request.body;

    const message = await updateTeamService(id, teamToUpdate);

    response.json(message);
}

const deleteTeamController = async (request, response) => {

    const {id} = request.params;

    const message = await deleteTeamService(id);

    response.json(message);
}


module.exports = {getAllTeamsController, getTeamByIdController, addTeamController, updateTeamController, deleteTeamController}