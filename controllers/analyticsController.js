const analyticsService = require("../services/analyticsService");
const {
  sendSuccess,
  sendControllerError
} = require("../utils/apiResponse");

exports.getDashboardAnalytics = async (req, res) => {
  try {
    const analytics = await analyticsService.getDashboardAnalytics(req.query);

    sendSuccess(
      res,
      200,
      analytics,
      "Dashboard analytics fetched successfully"
    );
  } catch (error) {
    sendControllerError(res, error);
  }
};
