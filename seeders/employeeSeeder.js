const mongoose = require('mongoose');
const Employee = require('../models/Employee');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const staticEmployees = [
  { name: 'John Doe', email: 'john.doe@company.com', department: 'IT', designation: 'Senior Developer', salary: 75000, joiningDate: new Date('2020-01-15'), status: 'Active', phone: '9876543210', address: '123 Main St, City' },
  { name: 'Jane Smith', email: 'jane.smith@company.com', department: 'IT', designation: 'Developer', salary: 70000, joiningDate: new Date('2021-03-20'), status: 'Active', phone: '9876543211', address: '124 Main St, City' },
  { name: 'Michael Johnson', email: 'michael.johnson@company.com', department: 'Marketing', designation: 'Marketing Manager', salary: 60000, joiningDate: new Date('2019-05-10'), status: 'Active', phone: '9876543212', address: '125 Main St, City' },
  { name: 'Sarah Williams', email: 'sarah.williams@company.com', department: 'HR', designation: 'HR Specialist', salary: 55000, joiningDate: new Date('2021-07-15'), status: 'Active', phone: '9876543213', address: '126 Main St, City' },
  { name: 'Robert Brown', email: 'robert.brown@company.com', department: 'Finance', designation: 'Financial Analyst', salary: 65000, joiningDate: new Date('2020-09-01'), status: 'Active', phone: '9876543214', address: '127 Main St, City' },
  { name: 'Emily Davis', email: 'emily.davis@company.com', department: 'IT', designation: 'Full Stack Developer', salary: 72000, joiningDate: new Date('2021-01-10'), status: 'Active', phone: '9876543215', address: '128 Main St, City' },
  { name: 'David Miller', email: 'david.miller@company.com', department: 'Sales', designation: 'Sales Executive', salary: 62000, joiningDate: new Date('2020-11-05'), status: 'Active', phone: '9876543216', address: '129 Main St, City' },
  { name: 'Lisa Anderson', email: 'lisa.anderson@company.com', department: 'Operations', designation: 'Operations Manager', salary: 58000, joiningDate: new Date('2019-08-20'), status: 'Active', phone: '9876543217', address: '130 Main St, City' },
  { name: 'James Taylor', email: 'james.taylor@company.com', department: 'IT', designation: 'Tech Lead', salary: 76000, joiningDate: new Date('2018-04-15'), status: 'Active', phone: '9876543218', address: '131 Main St, City' },
  { name: 'Mary Thomas', email: 'mary.thomas@company.com', department: 'HR', designation: 'Recruiter', salary: 54000, joiningDate: new Date('2021-06-10'), status: 'Active', phone: '9876543219', address: '132 Main St, City' },
  { name: 'Charles Jackson', email: 'charles.jackson@company.com', department: 'Finance', designation: 'Senior Accountant', salary: 68000, joiningDate: new Date('2019-02-01'), status: 'Active', phone: '9876543220', address: '133 Main St, City' },
  { name: 'Patricia White', email: 'patricia.white@company.com', department: 'Marketing', designation: 'Content Strategist', salary: 61000, joiningDate: new Date('2020-08-15'), status: 'Active', phone: '9876543221', address: '134 Main St, City' },
  { name: 'Christopher Harris', email: 'christopher.harris@company.com', department: 'IT', designation: 'Backend Developer', salary: 74000, joiningDate: new Date('2020-06-01'), status: 'Active', phone: '9876543222', address: '135 Main St, City' },
  { name: 'Jennifer Martin', email: 'jennifer.martin@company.com', department: 'Sales', designation: 'Account Manager', salary: 63000, joiningDate: new Date('2021-02-20'), status: 'Active', phone: '9876543223', address: '136 Main St, City' },
  { name: 'Mark Thompson', email: 'mark.thompson@company.com', department: 'Operations', designation: 'Logistics Coordinator', salary: 59000, joiningDate: new Date('2020-12-01'), status: 'Active', phone: '9876543224', address: '137 Main St, City' },
  { name: 'Linda Garcia', email: 'linda.garcia@company.com', department: 'IT', designation: 'QA Engineer', salary: 71000, joiningDate: new Date('2020-03-10'), status: 'Active', phone: '9876543225', address: '138 Main St, City' },
  { name: 'Steven Martinez', email: 'steven.martinez@company.com', department: 'HR', designation: 'Training Specialist', salary: 56000, joiningDate: new Date('2021-05-15'), status: 'Inactive', phone: '9876543226', address: '139 Main St, City' },
  { name: 'Barbara Robinson', email: 'barbara.robinson@company.com', department: 'Finance', designation: 'Tax Specialist', salary: 67000, joiningDate: new Date('2019-09-01'), status: 'Active', phone: '9876543227', address: '140 Main St, City' },
  { name: 'Paul Clark', email: 'paul.clark@company.com', department: 'Marketing', designation: 'Social Media Manager', salary: 59000, joiningDate: new Date('2021-04-20'), status: 'Active', phone: '9876543228', address: '141 Main St, City' },
  { name: 'Nancy Rodriguez', email: 'nancy.rodriguez@company.com', department: 'Sales', designation: 'Sales Manager', salary: 64000, joiningDate: new Date('2019-10-15'), status: 'Active', phone: '9876543229', address: '142 Main St, City' },
  { name: 'Daniel Lewis', email: 'daniel.lewis@company.com', department: 'IT', designation: 'Frontend Developer', salary: 73000, joiningDate: new Date('2020-07-10'), status: 'Active', phone: '9876543230', address: '143 Main St, City' },
  { name: 'Karen Lee', email: 'karen.lee@company.com', department: 'Operations', designation: 'Supply Chain Manager', salary: 60000, joiningDate: new Date('2020-02-01'), status: 'Active', phone: '9876543231', address: '144 Main St, City' },
  { name: 'Matthew Walker', email: 'matthew.walker@company.com', department: 'Finance', designation: 'Budget Analyst', salary: 66000, joiningDate: new Date('2020-10-15'), status: 'Inactive', phone: '9876543232', address: '145 Main St, City' },
  { name: 'Betty Hall', email: 'betty.hall@company.com', department: 'HR', designation: 'Benefits Administrator', salary: 55000, joiningDate: new Date('2021-08-10'), status: 'Inactive', phone: '9876543233', address: '146 Main St, City' },
  { name: 'Anthony Young', email: 'anthony.young@company.com', department: 'IT', designation: 'DevOps Engineer', salary: 75000, joiningDate: new Date('2019-11-01'), status: 'Inactive', phone: '9876543234', address: '147 Main St, City' },
  { name: 'Donna Hernandez', email: 'donna.hernandez@company.com', department: 'Marketing', designation: 'Brand Manager', salary: 58000, joiningDate: new Date('2021-03-15'), status: 'Inactive', phone: '9876543235', address: '148 Main St, City' },
  { name: 'Donald King', email: 'donald.king@company.com', department: 'Sales', designation: 'Sales Representative', salary: 61000, joiningDate: new Date('2021-01-20'), status: 'Active', phone: '9876543236', address: '149 Main St, City' },
  { name: 'Margaret Wright', email: 'margaret.wright@company.com', department: 'Operations', designation: 'Process Analyst', salary: 57000, joiningDate: new Date('2020-05-10'), status: 'Active', phone: '9876543237', address: '150 Main St, City' },
  { name: 'Steven Lopez', email: 'steven.lopez@company.com', department: 'Finance', designation: 'Payroll Specialist', salary: 69000, joiningDate: new Date('2019-03-01'), status: 'Active', phone: '9876543238', address: '151 Main St, City' },
  { name: 'Dorothy Hill', email: 'dorothy.hill@company.com', department: 'IT', designation: 'Software Engineer', salary: 70000, joiningDate: new Date('2020-04-15'), status: 'Active', phone: '9876543239', address: '152 Main St, City' },
  { name: 'Paul Scott', email: 'paul.scott@company.com', department: 'HR', designation: 'HR Coordinator', salary: 53000, joiningDate: new Date('2021-09-01'), status: 'Active', phone: '9876543240', address: '153 Main St, City' },
  { name: 'Ashley Green', email: 'ashley.green@company.com', department: 'Marketing', designation: 'Market Researcher', salary: 60000, joiningDate: new Date('2020-09-20'), status: 'Active', phone: '9876543241', address: '154 Main St, City' },
  { name: 'Kenneth Adams', email: 'kenneth.adams@company.com', department: 'Sales', designation: 'Territory Manager', salary: 62000, joiningDate: new Date('2019-12-10'), status: 'Active', phone: '9876543242', address: '155 Main St, City' },
  { name: 'Kimberly Nelson', email: 'kimberly.nelson@company.com', department: 'IT', designation: 'Database Administrator', salary: 72000, joiningDate: new Date('2020-02-15'), status: 'Active', phone: '9876543243', address: '156 Main St, City' },
  { name: 'Joshua Carter', email: 'joshua.carter@company.com', department: 'Operations', designation: 'Warehouse Manager', salary: 58000, joiningDate: new Date('2019-07-01'), status: 'Active', phone: '9876543244', address: '157 Main St, City' },
  { name: 'Carol Mitchell', email: 'carol.mitchell@company.com', department: 'Finance', designation: 'Internal Auditor', salary: 65000, joiningDate: new Date('2018-11-15'), status: 'Inactive', phone: '9876543245', address: '158 Main St, City' },
  { name: 'Kevin Roberts', email: 'kevin.roberts@company.com', department: 'IT', designation: 'System Administrator', salary: 71000, joiningDate: new Date('2020-01-20'), status: 'Active', phone: '9876543246', address: '159 Main St, City' },
  { name: 'Melissa Phillips', email: 'melissa.phillips@company.com', department: 'HR', designation: 'Employee Relations Manager', salary: 54000, joiningDate: new Date('2021-07-10'), status: 'Active', phone: '9876543247', address: '160 Main St, City' },
  { name: 'Brian Campbell', email: 'brian.campbell@company.com', department: 'Marketing', designation: 'Digital Marketing Specialist', salary: 59000, joiningDate: new Date('2021-02-01'), status: 'Active', phone: '9876543248', address: '161 Main St, City' },
  { name: 'Debra Parker', email: 'debra.parker@company.com', department: 'Sales', designation: 'Customer Success Manager', salary: 63000, joiningDate: new Date('2020-03-20'), status: 'Inactive', phone: '9876543249', address: '162 Main St, City' },
  { name: 'Edward Evans', email: 'edward.evans@company.com', department: 'IT', designation: 'Security Engineer', salary: 74000, joiningDate: new Date('2019-06-10'), status: 'Active', phone: '9876543250', address: '163 Main St, City' },
  { name: 'Sandra Edwards', email: 'sandra.edwards@company.com', department: 'Operations', designation: 'Facilities Manager', salary: 61000, joiningDate: new Date('2020-08-01'), status: 'Inactive', phone: '9876543251', address: '164 Main St, City' },
  { name: 'Ronald Collins', email: 'ronald.collins@company.com', department: 'Finance', designation: 'Financial Controller', salary: 68000, joiningDate: new Date('2018-05-15'), status: 'Active', phone: '9876543252', address: '165 Main St, City' },
  { name: 'Cynthia Stewart', email: 'cynthia.stewart@company.com', department: 'IT', designation: 'Mobile Developer', salary: 69000, joiningDate: new Date('2020-11-10'), status: 'Active', phone: '9876543253', address: '166 Main St, City' },
  { name: 'Timothy Sanchez', email: 'timothy.sanchez@company.com', department: 'HR', designation: 'Compensation Analyst', salary: 56000, joiningDate: new Date('2021-04-01'), status: 'Active', phone: '9876543254', address: '167 Main St, City' },
  { name: 'Kathleen Morris', email: 'kathleen.morris@company.com', department: 'Marketing', designation: 'Event Coordinator', salary: 57000, joiningDate: new Date('2021-06-20'), status: 'Active', phone: '9876543255', address: '168 Main St, City' },
  { name: 'Jason Rogers', email: 'jason.rogers@company.com', department: 'Sales', designation: 'Sales Director', salary: 64000, joiningDate: new Date('2018-09-01'), status: 'Inactive', phone: '9876543256', address: '169 Main St, City' },
  { name: 'Shirley Morgan', email: 'shirley.morgan@company.com', department: 'IT', designation: 'Data Scientist', salary: 73000, joiningDate: new Date('2019-08-15'), status: 'Active', phone: '9876543257', address: '170 Main St, City' },
  { name: 'Jeffrey Peterson', email: 'jeffrey.peterson@company.com', department: 'Operations', designation: 'Quality Assurance Manager', salary: 59000, joiningDate: new Date('2020-10-01'), status: 'Active', phone: '9876543258', address: '171 Main St, City' },
  { name: 'Angela Bell', email: 'angela.bell@company.com', department: 'Finance', designation: 'General Accountant', salary: 67000, joiningDate: new Date('2019-01-20'), status: 'Active', phone: '9876543259', address: '172 Main St, City' },
];

// Static login credentials
const staticUser = {
  email: 'admin@company.com',
  password: 'Admin@123456'
};

const seedEmployees = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Employee.deleteMany({});
    await User.deleteMany({});
    console.log('Cleared existing employees and users');
    
    // Create static user
    const hashedPassword = await bcrypt.hash(staticUser.password, 10);
    const user = await User.create({
      email: staticUser.email,
      password: hashedPassword
    });
    console.log(`✓ Static user created: ${staticUser.email}`);
    console.log(`  Password: ${staticUser.password}`);
    
    // Seed employees
    const result = await Employee.insertMany(staticEmployees);
    console.log(`✓ Successfully seeded ${result.length} employees`);
    
    console.log('\n📋 Login Credentials:');
    console.log('─'.repeat(40));
    console.log(`Email:    ${staticUser.email}`);
    console.log(`Password: ${staticUser.password}`);
    console.log('─'.repeat(40));
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error.message);
    process.exit(1);
  }
};

seedEmployees();