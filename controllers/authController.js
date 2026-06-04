const authService = require("../services/authService");
const {
  sendSuccess,
  sendControllerError
} = require("../utils/apiResponse");

exports.login = async (req, res) => {
  try {
    const token = await authService.loginUser(req.body);
    sendSuccess(res, 200, { token }, "Login successful");
  } catch (error) {
    sendControllerError(res, error);
  }
};

exports.getMe = async (req, res) => {
  try {
    const user = await authService.getCurrentUser(req.user.id);
    sendSuccess(res, 200, user, "User fetched successfully");
  } catch (error) {
    sendControllerError(res, error);
  }
};

exports.logout = async (req, res) => {
  try {
    sendSuccess(res, 200, null, "Logout successful");
  } catch (error) {
    sendControllerError(res, error);
  }
};
