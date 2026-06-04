/**
 * Constants for Employee Management Backend
 */

// Employee Status
const EMPLOYEE_STATUS = {
  ACTIVE: "Active",
  INACTIVE: "Inactive"
};

// Departments
const DEPARTMENTS = [
  "HR",
  "IT",
  "Finance",
  "Operations",
  "Marketing",
  "Sales",
  "Other"
];

// JWT Token Expiration
const TOKEN_EXPIRATION = {
  ACCESS: "7d",
  REFRESH: "30d"
};

// Pagination
const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 100
};

// Rate Limiting
const RATE_LIMIT = {
  GENERAL: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100
  },
  AUTH: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5
  }
};

// HTTP Status Codes
const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500
};

// Error Messages
const ERROR_MESSAGES = {
  INVALID_CREDENTIALS: "Invalid email or password",
  EMAIL_ALREADY_EXISTS: "Email already exists",
  USER_NOT_FOUND: "User not found",
  EMPLOYEE_NOT_FOUND: "Employee not found",
  UNAUTHORIZED: "Unauthorized",
  TOKEN_EXPIRED: "Token has expired",
  INVALID_TOKEN: "Invalid token",
  VALIDATION_ERROR: "Validation error",
  INTERNAL_ERROR: "Internal server error"
};

// Success Messages
const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: "Login successful",
  LOGOUT_SUCCESS: "Logged out successfully",
  REGISTER_SUCCESS: "User registered successfully",
  EMPLOYEE_CREATED: "Employee created successfully",
  EMPLOYEE_UPDATED: "Employee updated successfully",
  EMPLOYEE_DELETED: "Employee deleted successfully",
  ANALYTICS_RETRIEVED: "Analytics retrieved successfully"
};

module.exports = {
  EMPLOYEE_STATUS,
  DEPARTMENTS,
  TOKEN_EXPIRATION,
  PAGINATION,
  RATE_LIMIT,
  HTTP_STATUS,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES
};
