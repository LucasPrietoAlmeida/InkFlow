const authService = require("../services/auth.service");

const register = async (req, res) => {
    try {
        const user = await authService.register(req.body);

        res.status(201).json(user);
    } catch (error) {
        console.error("Register error:", error.message);

        res.status(400).json({
        error: error.message,
        });
    }
};

const login = async (req, res) => {
    try {
        const result = await authService.login(req.body);

        res.status(200).json(result);
    } catch(error) {
        console.error("Login error:", error.message);

        res.status(401).json({
            error: error.message,
        });
    }
};

module.exports = {
    register,
    login,
};