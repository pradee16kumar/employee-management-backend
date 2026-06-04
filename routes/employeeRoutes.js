const express = require("express");

const authMiddleware = require(
  "../middleware/authMiddleware"
);

const {
  createEmployee,
  getEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee
} = require(
  "../controllers/employeeController"
);

const router = express.Router();

router.use(authMiddleware);

router.post("/", createEmployee);

router.get("/", getEmployees);

router.get("/:id", getEmployeeById);

router.put("/:id", updateEmployee);

router.delete("/:id", deleteEmployee);

module.exports = router;