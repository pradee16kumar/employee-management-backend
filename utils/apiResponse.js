/**
 * Standardized API Response Handler
 * Ensures consistent response format across all endpoints
 */

class ApiResponse {
  constructor(statusCode, data, message = "Success") {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = statusCode < 400;
  }
}

/**
 * Send successful response
 */
const sendSuccess = (res, statusCode, data, message = "Success") => {
  res.status(statusCode).json({
    success: true,
    statusCode,
    message,
    data,
    timestamp: new Date().toISOString()
  });
};

/**
 * Send error response
 */
const sendError = (res, statusCode, message, error = null) => {
  const response = {
    success: false,
    statusCode,
    message,
    timestamp: new Date().toISOString()
  };

  // Include error details only in development
  if (process.env.NODE_ENV === "development" && error) {
    response.error = {
      message: error.message,
      stack: error.stack
    };
  }

  res.status(statusCode).json(response);
};

const sendControllerError = (res, error) => {
  const statusCode = error.statusCode || 500;
  const message = error.message || "Internal Server Error";

  sendError(res, statusCode, message, error);
};

module.exports = {
  ApiResponse,
  sendSuccess,
  sendError,
  sendControllerError
};
