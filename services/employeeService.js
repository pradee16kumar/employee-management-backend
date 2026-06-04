const Employee = require("../models/Employee");

const buildEmployeeQuery = ({ search = "", department, status }) => {
  const query = {};

  if (search) {
    query.$or = [
      {
        name: {
          $regex: search,
          $options: "i"
        }
      },
      {
        email: {
          $regex: search,
          $options: "i"
        }
      }
    ];
  }

  if (department) {
    query.department = department;
  }

  if (status) {
    query.status = status;
  }

  return query;
};

const createEmployee = async (employeeData) => {
  return Employee.create(employeeData);
};

const getEmployees = async ({
  search = "",
  department,
  status,
  page = 1,
  limit = 5
}) => {
  const currentPage = Number(page);
  const pageLimit = Number(limit);
  const query = buildEmployeeQuery({
    search,
    department,
    status
  });

  const total = await Employee.countDocuments(query);
  const employees = await Employee.find(query)
    .skip((currentPage - 1) * pageLimit)
    .limit(pageLimit)
    .sort({ createdAt: -1 });

  return {
    total,
    page: currentPage,
    totalPages: Math.ceil(total / pageLimit),
    employees
  };
};

const getEmployeeById = async (id) => {
  const employee = await Employee.findById(id);

  if (!employee) {
    const error = new Error("Employee not found");
    error.statusCode = 404;
    throw error;
  }

  return employee;
};

const updateEmployee = async (id, employeeData) => {
  const employee = await Employee.findByIdAndUpdate(id, employeeData, {
    new: true
  });

  if (!employee) {
    const error = new Error("Employee not found");
    error.statusCode = 404;
    throw error;
  }

  return employee;
};

const deleteEmployee = async (id) => {
  const employee = await Employee.findByIdAndDelete(id);

  if (!employee) {
    const error = new Error("Employee not found");
    error.statusCode = 404;
    throw error;
  }

  return {
    message: "Employee deleted successfully"
  };
};

module.exports = {
  createEmployee,
  getEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee
};
