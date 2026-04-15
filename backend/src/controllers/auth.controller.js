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

module.exports = {
    register,
};