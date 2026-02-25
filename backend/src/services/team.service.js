const { prisma } = require("../db/config")

const getAllTeamsService = async () => {
  const allTeams = await prisma.team.findMany({
    include: {
      users: {
        select: {
          id: true,
          username: true,
        },
      },
    },
  });

  if (allTeams.length === 0) {
    return { message: "Teams not found", statusCode: 404 };
  }

  return allTeams;
};

const getTeamByIdService = async (id) => {

    const team = await prisma.team.findUnique({
        where: { id: Number(id) },
          include: {
            users: {
                select: {
                    id: true,
                    username: true,
                },
            }
        }
    });

    if(!team){
        return {message: "Team not found", statusCode: 404}
    }
    
    return team;
}

const addTeamService = async (team) => {
    try {
        await prisma.team.create({
            data: team,
        });

        return { message: "Team added successfully", statusCode: 201 };
    } catch (error) {
        return { message: error, statusCode: 500 };
    }
};

const updateTeamService = async (id, teamToUpdate) => {
    try {
        const teamById = await prisma.team.findUnique({
            where: { id: Number(id) },
        });

        if (!teamById) {
            return { message: "Team not found", statusCode: 404 };
        }

        await prisma.team.update({
            where: { id: Number(id) },
            data: teamToUpdate,
        });

        return { message: "Team updated successfully", statusCode: 201 };
    } catch (error) {
        return { message: error, statusCode: 500 };
    }
};

const deleteTeamService = async (id) => {
    try {
        const team = await prisma.team.findUnique({
            where: { id: Number(id) },
        });

        if (!team) {
            return { message: "Team not found", statusCode: 404 };
        }

        await prisma.team.delete({
            where: { id: Number(id) },
        });

        return { message: "Team deleted successfully", statusCode: 201 };
    } catch (error) {
        return { message: error, statusCode: 500 };
    }
};

module.exports = {getAllTeamsService, getTeamByIdService, addTeamService, updateTeamService, deleteTeamService}