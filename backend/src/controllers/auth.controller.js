const { registerService, loginService } = require("../services/auth.service");


const registerController = async (request, response) => {

    const newUser = request.body;

    const message = await registerService(newUser);

    response.status(message.statusCode).json({message: message.message });
};


const loginController = async (request, response) => {

    const credentials = request.body;

    const result = await loginService(credentials);

    if (result?.token) {
        response.cookie("accessToken", result.token, { httpOnly: true });
        return response.status(result.statusCode).json({message: result.message, user: result.user})
    } else{
        return response.status(result.statusCode).json({message: result.message });
    }

};


const logoutController = async (request, response) => {
    response.clearCookie("accessToken", {
        secure: true,
        sameSite: "none"
    }).status(200).json("User has been logout !")
}


module.exports = {registerController, loginController, logoutController}













/* FUNCIONALIDADES SIN SERVICE Y SIN PRISMA

const registerController = async (request, response) => {
    
    const q = "SELECT username, email FROM users WHERE username = ? OR email = ?";

    db.query(q, [request.body.username, request.body.email], (err, data) =>{
        if(err) return response.status(500).json(err)
        //if(data.length) return response.status(409).json("User already exists !")

        const usernameExists = data.some(u => u.username === request.body.username);
        if (usernameExists) return response.status(409).json("User already exists !");

        const emailExists = data.some(u => u.email === request.body.email);
        if (emailExists) return response.status(409).json("Email already exists !");


        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(request.body.password, salt)

        const q = 'INSERT INTO users (`username`, `email`, `password`) VALUE (?)' 

        const values = [
            request.body.username, 
            request.body.email, 
            hashedPassword
        ]

        db.query(q, [values], (err, data) =>{
            if(err) return response.status(500).json(err)
            return response.status(200).json("User has been created !")
        })

    })
}


const loginController = async (request, response) => {
    
    const q = 'SELECT * FROM users WHERE username = ?'

    db.query(q, [request.body.username], (err, data) =>{
        if(err) return response.status(500).json(err)
        if(data.length === 0) return response.status(404).json("User not found !")

        const checkPassword = bcrypt.compareSync(request.body.password, data[0].password)
        if(!checkPassword) return response.status(400).json("Wrong password or username !")
        
        const token = jwt.sign({id: data[0].id}, "secretkey", { expiresIn: "1d" }) 

        const {password, ...others} = data[0] 

        response.cookie("accessToken", token, {
            httpOnly: true
        }).status(200).json(others)
    
    })
}

*/