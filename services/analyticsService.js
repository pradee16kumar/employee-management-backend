const Employee = require("../models/Employee");

const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];

const getDashboardAnalytics = async () => {
  const totalEmployees = await Employee.countDocuments();
  const activeEmployees = await Employee.countDocuments({
    status: "Active"
  });
  const inactiveEmployees = await Employee.countDocuments({
    status: "Inactive"
  });

  const departmentStats = await Employee.aggregate([
    {
      $group: {
        _id: "$department",
        count: { $sum: 1 }
      }
    },
    {
      $project: {
        department: "$_id",
        count: 1,
        _id: 0
      }
    }
  ]);

  const statusDistribution = await Employee.aggregate([
    {
      $group: {
        _id: "$status",
        value: { $sum: 1 }
      }
    },
    {
      $project: {
        name: "$_id",
        value: 1,
        _id: 0
      }
    }
  ]);

  const monthlyJoinedEmployees = await Employee.aggregate([
    {
      $group: {
        _id: {
          $month: "$joiningDate"
        },
        count: {
          $sum: 1
        }
      }
    },
    {
      $sort: {
        _id: 1
      }
    }
  ]);

  const monthlyCounts = monthlyJoinedEmployees.reduce((counts, item) => {
    counts[item._id] = item.count;
    return counts;
  }, {});

  const formattedMonthlyData = monthNames.map((month, index) => ({
    month,
    count: monthlyCounts[index + 1] || 0
  }));

  return {
    totalEmployees,
    activeEmployees,
    inactiveEmployees,
    departmentStats,
    statusDistribution,
    monthlyJoinedEmployees,
    formattedMonthlyData
  };
};

module.exports = {
  getDashboardAnalytics
};
