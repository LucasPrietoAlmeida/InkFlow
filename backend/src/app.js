const express = require("express");
const cors = require("cors");
const prisma = require("./config/prisma");

const app = express();

app.use(cors());
app.use(express.json());


app.get("/health", (req, res) => {
    res.json({
        status: "ok",
        service: "inkflow-backend",
        time: new Date().toISOString(),
    });
});

app.get("/test-db", async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({
        error: "Database connection error",
        });
    }
});

module.exports = app;