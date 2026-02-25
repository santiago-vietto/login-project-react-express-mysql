const { prisma } = require("../db/config")

const getAllUsersService = async () => {
    const allUsers = await prisma.user.findMany({
        include: {
            team: {
                select: {
                    id: true,
                    name: true,
                },
            },
        },
    });

    if(allUsers.length === 0){
        return {message: "Users not found", statusCode: 404}
    }

    return { allUsers, statusCode:200 };
}

const getUserByIdService = async (id) => {

    const user = await prisma.user.findUnique({
        where: { id: Number(id) },
        include: { team: true, }
    });

    if(!user){
        return {message: "User not found", statusCode: 404}
    }
    
    return { user, statusCode:200 };
}

const updateUserService = async (id, userToUpdate) => {
    try {
        const userById = await prisma.user.findUnique({
            where: { id: Number(id) },
        });

        if (!userById) {
            return { message: "User not found", statusCode: 404 };
        }

        await prisma.user.update({
            where: { id: Number(id) },
            data: userToUpdate,
        });

        return { message: "User updated successfully", statusCode: 201 };
    } catch (error) {
        return { message: error, statusCode: 500 };
    }
};

const deleteUserService = async (id) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: Number(id) },
        });

        if (!user) {
            return { message: "User not found", statusCode: 404 };
        }

        await prisma.user.delete({
            where: { id: Number(id) },
        });

        return { message: "User deleted successfully", statusCode: 201 };
    } catch (error) {
        return { message: error, statusCode: 500 };
    }
};

module.exports = { getAllUsersService, getUserByIdService, updateUserService, deleteUserService } 