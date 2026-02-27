const { getAllUsersDao, getUserByIdDao, updateUserDao, deleteUserDao } = require("../daos/user.dao")

const getAllUsersService = async () => {

    const allUsers = await getAllUsersDao();

    if (allUsers.length === 0) {
        return { message: "Users not found", statusCode: 404 };
    }

    return { allUsers, statusCode: 200 };
}

const getUserByIdService = async (id) => {

    const user = await getUserByIdDao(Number(id));

    if(!user){
        return {message: "User not found", statusCode: 404}
    }
    
    return { user, statusCode:200 };
}

const updateUserService = async (id, userToUpdate) => {
    try {
        const userById = await getUserByIdDao(Number(id));

        if (!userById) {
            return { message: "User not found", statusCode: 404 };
        }

        await updateUserDao(Number(id), userToUpdate);

        return { message: "User updated successfully", statusCode: 201 };
    } catch (error) {
        return { message: error, statusCode: 500 };
    }
};

const deleteUserService = async (id) => {
    try {
        const user = await getUserByIdDao(Number(id));

        if (!user) {
            return { message: "User not found", statusCode: 404 };
        }

        await deleteUserDao(Number(id));

        return { message: "User deleted successfully", statusCode: 201 };
    } catch (error) {
        return { message: error, statusCode: 500 };
    }
};

module.exports = { getAllUsersService, getUserByIdService, updateUserService, deleteUserService } 