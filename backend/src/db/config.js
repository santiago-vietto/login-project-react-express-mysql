require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const { PrismaMariaDb } = require("@prisma/adapter-mariadb");

const DATABASE_HOST = process.env.DATABASE_HOST;
const DATABASE_USER = process.env.DATABASE_USER;
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD;
const DATABASE_NAME = process.env.DATABASE_NAME;
const DATABASE_PORT = process.env.DATABASE_PORT;


const adapter = new PrismaMariaDb({
  host: DATABASE_HOST,
  user: DATABASE_USER,
  password: DATABASE_PASSWORD,
  database: DATABASE_NAME,
  port: DATABASE_PORT,
  connectionLimit: 5,
});

const prisma = new PrismaClient({ adapter });

const connectDB = async () => {
  try{
    await prisma.$connect();
    await prisma.$queryRaw`SELECT 1`; 
    console.log("Conectado a la DB MySQL via Prisma !");
  }catch(error){
    console.error("Error de conexión con la DB MySQL: ", error);
    process.exit(1);
  }
};

const disconnectDB = async () => {
  await prisma.$disconnect();
};

module.exports = { prisma, connectDB, disconnectDB };









/* ----------------------------------------------------------------------------- */

/*
// CONEXION TRADICIONAL SIN PRISMA //

require('dotenv').config();
const mysql = require('mysql');

const DATABASE_HOST = process.env.DATABASE_HOST;
const DATABASE_USER = process.env.DATABASE_USER;
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD;
const DATABASE_NAME = process.env.DATABASE_NAME;

const db = mysql.createPool({
  connectionLimit: 10,
  host: DATABASE_HOST,
  user: DATABASE_USER,
  password: DATABASE_PASSWORD,
  database: DATABASE_NAME
});

module.exports = db;  */





