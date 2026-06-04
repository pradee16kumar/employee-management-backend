/**
 * Input Validation Schemas using Joi
 */

const Joi = require("joi");

// Auth Validation Schemas
const registerSchema = Joi.object({
  email: Joi.string()
    .email()
    .lowercase()
    .trim()
    .required()
    .messages({
      "string.email": "Please provide a valid email address",
      "any.required": "Email is required"
    }),
  password: Joi.string()
    .min(8)
    .required()
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    .messages({
      "string.pattern.base": "Password must contain uppercase, lowercase, number, and special character",
      "string.min": "Password must be at least 8 characters long",
      "any.required": "Password is required"
    }),
  confirmPassword: Joi.string()
    .required()
    .valid(Joi.ref("password"))
    .messages({
      "any.only": "Passwords do not match",
      "any.required": "Confirm password is required"
    })
});

const loginSchema = Joi.object({
  email: Joi.string()
    .email()
    .lowercase()
    .trim()
    .required()
    .messages({
      "string.email": "Please provide a valid email address",
      "any.required": "Email is required"
    }),
  password: Joi.string()
    .required()
    .messages({
      "any.required": "Password is required"
    })
});

// Employee Validation Schemas
const createEmployeeSchema = Joi.object({
  name: Joi.string()
    .trim()
    .min(2)
    .max(100)
    .required()
    .messages({
      "string.min": "Name must be at least 2 characters",
      "string.max": "Name cannot exceed 100 characters",
      "any.required": "Name is required"
    }),
  email: Joi.string()
    .email()
    .lowercase()
    .trim()
    .required()
    .messages({
      "string.email": "Please provide a valid email address",
      "any.required": "Email is required"
    }),
  department: Joi.string()
    .trim()
    .required()
    .messages({
      "any.required": "Department is required"
    }),
  designation: Joi.string()
    .trim()
    .required()
    .messages({
      "any.required": "Designation is required"
    }),
  status: Joi.string()
    .valid("Active", "Inactive")
    .default("Active")
    .messages({
      "any.only": "Status must be either Active or Inactive"
    }),
  joiningDate: Joi.date()
    .required()
    .messages({
      "date.base": "Joining date must be a valid date",
      "any.required": "Joining date is required"
    })
});

const updateEmployeeSchema = Joi.object({
  name: Joi.string()
    .trim()
    .min(2)
    .max(100)
    .optional(),
  email: Joi.string()
    .email()
    .lowercase()
    .trim()
    .optional(),
  department: Joi.string()
    .trim()
    .optional(),
  designation: Joi.string()
    .trim()
    .optional(),
  status: Joi.string()
    .valid("Active", "Inactive")
    .optional(),
  joiningDate: Joi.date()
    .optional()
});

// Query Validation Schema
const paginationSchema = Joi.object({
  page: Joi.number()
    .integer()
    .min(1)
    .default(1),
  limit: Joi.number()
    .integer()
    .min(1)
    .max(100)
    .default(10),
  search: Joi.string()
    .trim()
    .optional(),
  department: Joi.string()
    .trim()
    .optional(),
  status: Joi.string()
    .valid("Active", "Inactive")
    .optional()
});

/**
 * Validation function
 */
const validate = (schema) => {
  return (data) => {
    const { error, value } = schema.validate(data, {
      abortEarly: false,
      stripUnknown: true
    });

    if (error) {
      const messages = error.details.map(detail => ({
        field: detail.path.join("."),
        message: detail.message
      }));
      return { valid: false, messages };
    }

    return { valid: true, value };
  };
};

module.exports = {
  schemas: {
    registerSchema,
    loginSchema,
    createEmployeeSchema,
    updateEmployeeSchema,
    paginationSchema
  },
  validate
};
