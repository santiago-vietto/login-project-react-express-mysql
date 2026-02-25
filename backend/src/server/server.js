require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRouter = require("../routes/auth.route")
const userRouter = require("../routes/user.route")
const teamRouter = require("../routes/team.route")
const {connectDB, disconnectDB} = require("../db/config")

const app = express();
app.use(express.json());

connectDB();

const FRONTEND_URL = process.env.FRONTEND_URL;
app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(cookieParser())


app.use("/api/auth", authRouter) 
app.use("/api/user", userRouter)
app.use("/api/team", teamRouter) 

app.get("/", (_, response) => {
    response.send("Bienvenido al servidor del proyecto de login (React-Express-MySQL)")
})



/*---------------------------------------------------------------------------------------------*/

// Handle unhandle promise rejections (e.g database connection errors)
process.on("unhandledRejection", (err) => {
    console.error("Unhandled Rejection:", err);
    server.close(async () => {
        await disconnectDB();
        process.exit(1);
    });
});

// Handle uncaught exceptions
process.on("uncaughtException", async (err) => {
    console.error("Unhandled Exceptions:", err);
    await disconnectDB();
    process.exit(1);
});

// Graceful shutdown
process.on("SIGTERM", async () => {
    console.error("SIGTERM received, shutting down gracefully");
    server.close(async () => {
        await disconnectDB();
        process.exit(1);
    });
});

/*---------------------------------------------------------------------------------------------*/


module.exports = app;