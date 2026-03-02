const { prisma } = require("../db/config")

const getAllUsersDao = async () => {
    return await prisma.user.findMany({
        include: { team: true }
    });
}

const getUserByIdDao = async (id) => {
    return await prisma.user.findUnique({
        where: { id },
        include: { team: true }
    });
};

const updateUserDao = async (id, data) => {
    return await prisma.user.update({
        where: { id },
        data: data,
    });
};

const deleteUserDao = async (id) => {
    return await prisma.user.delete({
        where: { id }
    });
};

const getUserByUsernameOrEmailDao = async (username, email) => {
    return await prisma.user.findMany({
        where: {
            OR: [{ username }, { email }],
        },
        select: { 
            username: true, 
            email: true 
        },
    });
};

const createUserDao = async (userData) => {
    return await prisma.user.create({
        data: userData,
    });
};

const getUserByUsernameDao = async (username) => {
  return await prisma.user.findUnique({
    where: { username },
    include: { team: true },
  });
};


module.exports = { 
    getAllUsersDao, 
    getUserByIdDao, 
    updateUserDao, 
    deleteUserDao, 
    getUserByUsernameOrEmailDao, 
    createUserDao, 
    getUserByUsernameDao
};