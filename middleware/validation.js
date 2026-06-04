/**
 * Request Validation Middleware
 * Validates request body against provided schema
 */

const { validate } = require("../utils/validators");
const { sendError } = require("../utils/apiResponse");

const validateRequest = (schema) => {
  return (req, res, next) => {
    const validator = validate(schema);
    const result = validator(req.body);

    if (!result.valid) {
      return sendError(res, 400, "Validation failed", {
        errors: result.messages
      });
    }

    // Replace req.body with validated and sanitized data
    req.body = result.value;
    next();
  };
};

const validateQuery = (schema) => {
  return (req, res, next) => {
    const validator = validate(schema);
    const result = validator(req.query);

    if (!result.valid) {
      return sendError(res, 400, "Query validation failed", {
        errors: result.messages
      });
    }

    req.query = result.value;
    next();
  };
};

module.exports = {
  validateRequest,
  validateQuery
};
