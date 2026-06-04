/**
 * Error Handler Middleware
 * Centralized error handling for all routes
 */

const { sendError } = require("../utils/apiResponse");

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  console.error(`[ERROR] ${statusCode} - ${message}`, err);

  sendError(res, statusCode, message, err);
};

module.exports = errorHandler;
