const { getPublicProfile } = require("../services/user.service");

const getUserProfile = async (req, res) => {
    try {
        const { username } = req.params;

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 6;

        const data = await getPublicProfile(username, page, limit);

        res.json(data);
    } catch (error) {
        console.error(error);

        const status = error.statusCode || 500;

        res.status(status).json({
            error: error.message || "Internal server error",
        });
    }
};

module.exports = {
    getUserProfile,
};