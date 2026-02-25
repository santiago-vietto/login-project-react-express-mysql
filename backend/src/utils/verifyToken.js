const jwt = require("jsonwebtoken");
require("dotenv").config();

const JWT = process.env.JWT;

const verifyToken = (req, res, next) => {
  const token = req.cookies.accessToken; 

  if (!token) return res.status(401).json({message: "You are not authenticated :(" });

  jwt.verify(token, JWT, (err, user) => {
    if (err) return res.status(403).json({message: "Invalid Token :(" });
    req.user = user; 
    next();
  });
};

const verifyUser = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id == req.params.id || req.user.isAdmin) {
        return next();
    }else{
        return res.status(403).json({message: "You are not authorized :(" });
    } 
  });
};

const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) return next();
    return res.status(403).json({message: "You are not authorized as Admin :(" });
  });
};

module.exports = { verifyToken, verifyUser, verifyAdmin };
