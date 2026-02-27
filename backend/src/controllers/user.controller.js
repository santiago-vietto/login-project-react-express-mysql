const {getAllUsersService, getUserByIdService, updateUserService, deleteUserService} = require("../services/user.service")
const { allUsersDto, userDto, updateUserDto } = require("../dtos/user.dto");


const getAllUsersController = async (request, response) => {
    const result = await getAllUsersService()

    if(result.allUsers){
        const allUsers = allUsersDto(result.allUsers);
        return response.status(result.statusCode).json(allUsers);
    }

    return response.status(result.statusCode).json({message: result.message});
}


const getUserByIdController = async (request, response) => {

    const {id} = request.params;

    const result = await getUserByIdService(id);

    if(result.user){
        const user = userDto(result.user);
        return response.status(result.statusCode).json(user);
    }

    return response.status(result.statusCode).json({message: result.message});
}


const getMyUserController = async (request, response) => {

    const myUser = request.user.id;

    const result = await getUserByIdService(myUser);

    if(result.user){
        const user = userDto(result.user);
        return response.status(result.statusCode).json(user);
    }

    return response.status(result.statusCode).json({message: result.message});
}


const updateUserController = async (request, response) => {
    
    const {id} = request.params;
    const userToUpdate = updateUserDto(request.body);

    const message = await updateUserService(id, userToUpdate);

    response.status(message.statusCode).json({message: message.message });
}


const deleteUserController = async (request, response) => {

    const {id} = request.params;

    const message = await deleteUserService(id);
    
    response.status(message.statusCode).json({message: message.message });
}

module.exports = {getAllUsersController, getUserByIdController, updateUserController, deleteUserController, getMyUserController} 