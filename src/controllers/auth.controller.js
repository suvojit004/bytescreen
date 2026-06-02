const authService = require("../services/auth.service");

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

const login = async (
  req,
  res,
  next
) => {
  try {
    const result =
      await authService.loginUser(
        req.body
      );

    res.status(200).json({
      success: true,
      accessToken:
        result.accessToken,
      user: {
        id: result.user._id,
        email: result.user.email,
        role: result.user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
    setupAdmin,
    login
};