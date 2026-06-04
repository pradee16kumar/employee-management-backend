const employeeService = require("../services/employeeService");
const {
  sendSuccess,
  sendControllerError
} = require("../utils/apiResponse");

exports.createEmployee = async (req, res) => {
  try {
    const employee = await employeeService.createEmployee(req.body);

    sendSuccess(res, 201, employee, "Employee created successfully");
  } catch (error) {
    sendControllerError(res, error);
  }
};

exports.getEmployees = async (req, res) => {
  try {
    const employees = await employeeService.getEmployees(req.query);

    sendSuccess(res, 200, employees, "Employees fetched successfully");
  } catch (error) {
    sendControllerError(res, error);
  }
};

exports.getEmployeeById = async (req, res) => {
  try {
    const employee = await employeeService.getEmployeeById(req.params.id);

    sendSuccess(res, 200, employee, "Employee fetched successfully");
  } catch (error) {
    sendControllerError(res, error);
  }
};

exports.updateEmployee = async (req, res) => {
  try {
    const employee = await employeeService.updateEmployee(
      req.params.id,
      req.body
    );

    sendSuccess(res, 200, employee, "Employee updated successfully");
  } catch (error) {
    sendControllerError(res, error);
  }
};

exports.deleteEmployee = async (req, res) => {
  try {
    const result = await employeeService.deleteEmployee(req.params.id);

    sendSuccess(res, 200, result, "Employee deleted successfully");
  } catch (error) {
    sendControllerError(res, error);
  }
};

