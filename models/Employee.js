const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Employee name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [100, "Name cannot exceed 100 characters"]
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: [true, "Email already exists"],
      lowercase: true,
      trim: true,
      validate: {
        validator: function (v) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        },
        message: "Invalid email format"
      }
    },

    department: {
      type: String,
      required: [true, "Department is required"],
      trim: true,
      enum: {
        values: ["HR", "IT", "Finance", "Operations", "Marketing", "Sales", "Other"],
        message: "Invalid department"
      }
    },

    designation: {
      type: String,
      required: [true, "Designation is required"],
      trim: true
    },

    status: {
      type: String,
      enum: {
        values: ["Active", "Inactive"],
        message: "Status must be either Active or Inactive"
      },
      default: "Active"
    },

    joiningDate: {
      type: Date,
      required: [true, "Joining date is required"],
      validate: {
        validator: function (v) {
          return v <= new Date();
        },
        message: "Joining date cannot be in the future"
      }
    },

    phone: {
      type: String,
      trim: true,
      sparse: true
    },

    address: {
      type: String,
      trim: true,
      sparse: true
    },

    salary: {
      type: Number,
      min: [0, "Salary cannot be negative"],
      sparse: true
    }
  },
  {
    timestamps: true,
    collection: "employees"
  }
);

// Indexes for better query performance
employeeSchema.index({ email: 1 });
employeeSchema.index({ department: 1 });
employeeSchema.index({ status: 1 });
employeeSchema.index({ joiningDate: 1 });
employeeSchema.index({ name: "text", email: "text" });

// Virtual for age calculation
employeeSchema.virtual("yearsOfService").get(function () {
  const today = new Date();
  const joiningDate = new Date(this.joiningDate);
  return Math.floor((today - joiningDate) / (1000 * 60 * 60 * 24 * 365.25));
});

// Prevent exposing sensitive data in JSON
employeeSchema.set("toJSON", {
  virtuals: true,
  transform: function (doc, ret) {
    delete ret.__v;
    return ret;
  }
});

module.exports = mongoose.model("Employee", employeeSchema);