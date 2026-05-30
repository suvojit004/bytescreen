const authService = require("./auth.service");

const setupAdmin = async (req, res, next) => {
    try {
        const user =
            await authService.createInitialAdmin(
                req.body
            );

        res.status(201).json({
            success: true,
            message:
                "Initial admin created successfully",
            data: {
                id: user._id,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    setupAdmin,
};