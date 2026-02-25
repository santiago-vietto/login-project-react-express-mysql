const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { prisma } = require("../db/config");

const JWT = process.env.JWT;


const registerService = async ({ username, email, password }) => {

    try{
        const q = await prisma.user.findMany({
            where: {
                OR: [{ username }, { email }],
            },
            select: { 
                username: true, 
                email: true 
            },
        });

        const usernameExists = q.some((u) => u.username === username);
        if (usernameExists) {
            return { message: "User already exists !", statusCode: 409 };
        }

        const emailExists = q.some((u) => u.email === email);
        if (emailExists) {
            return { message: "Email already exists !", statusCode: 409 };
        }

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        await prisma.user.create({
            data: {
            username,
            email,
            password: hashedPassword,
            },
        });

        return { message: "User has been created !", statusCode: 200 };

    }catch(error){
        return { message: error, statusCode: 500 };
    }

};

const loginService = async ({ username, password }) => {

    try{
        const user = await prisma.user.findUnique({
            where: { username },
            include: { team: true, }
        });

        if (!user) {
            return { message: "User not found !", statusCode: 404 };
        }

        const checkPassword = bcrypt.compareSync(password, user.password);
        if (!checkPassword) {
            return { message: "Wrong password or username !", statusCode: 400 };
        }
        
        const token = jwt.sign({ id: user.id, isAdmin: user.isAdmin }, JWT, { expiresIn: "1d" });
        const { password: _pw, ...others } = user;

        
        return { token, message: "Login successfully !", user: others, statusCode: 200 };

    }catch(error){
        return { message: error, statusCode: 500 };
    }
    
};



module.exports = { registerService, loginService };
