const {getAllUsersService, getUserByIdService, updateUserService, deleteUserService} = require("../services/user.service")

const getAllUsersController = async (_, response) => {
    const allUsers = await getAllUsersService()

    if(allUsers.allUsers){
        return response.status(allUsers.statusCode).json(allUsers.allUsers);
    }

    return response.status(allUsers.statusCode).json({message: allUsers.message});
}

const getUserByIdController = async (request, response) => {

    const {id} = request.params;

    const user = await getUserByIdService(id);

    if(user.user){
        return response.status(user.statusCode).json(user.user);
    }

    return response.status(user.statusCode).json({message: user.message});
}

const getMyUserController = async (request, response) => {

    const myUser = request.user.id;

    const data = await getUserByIdService(myUser);

    if(data.user){
       return response.status(data.statusCode).json(data.user);
    }

    return response.status(data.statusCode).json({message: data.message});
}


const updateUserController = async (request, response) => {
    
    const {id} = request.params;
    const userToUpdate = request.body;

    const message = await updateUserService(id, userToUpdate);

    response.status(message.statusCode).json({message: message.message });
}

const deleteUserController = async (request, response) => {

    const {id} = request.params;

    const message = await deleteUserService(id);
    
    response.status(message.statusCode).json({message: message.message });
}

module.exports = {getAllUsersController, getUserByIdController, updateUserController, deleteUserController, getMyUserController} 