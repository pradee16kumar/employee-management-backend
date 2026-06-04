<<<<<<< HEAD
# Employee Management Backend

A comprehensive Node.js + Express backend API for employee management system with JWT authentication, CRUD operations, advanced filtering, pagination, and analytics.

## Features

### Core Functionality
- ✅ JWT-based authentication with secure token management
- ✅ Complete CRUD operations for employees
- ✅ Advanced search (by name/email) and filtering
- ✅ Pagination with customizable limits
- ✅ Input validation with Joi
- ✅ Comprehensive analytics and reporting

### Security & Performance
- ✅ Password hashing with bcryptjs
- ✅ Rate limiting on sensitive endpoints
- ✅ Helmet for HTTP headers security
- ✅ CORS support for frontend integration
- ✅ MongoDB indexes for optimization
- ✅ Request logging with Morgan

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT
- **Validation:** Joi
- **Security:** Helmet, bcryptjs, express-rate-limit
- **Logging:** Morgan

## Installation

### Prerequisites
- Node.js (v14+)
- MongoDB (local or cloud)
- npm or yarn

### Setup Steps

1. **Clone repository**
   ```bash
   git clone <repository-url>
   cd employee-management-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create .env file**
   ```bash
   cp .env.example .env
   ```
   Configure your environment:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   CLIENT_URL=http://localhost:3000
   ```

4. **Start the server**
   ```bash
   # Development mode with hot reload
   npm run dev

   # Production mode
   npm start
   ```

Server runs on `http://localhost:5000`

## Database Seeding

### Initialize with 50 Static Employees & Admin User

Run this command to populate the database:

```bash
node seeders/employeeSeeder.js
```

**What it does:**
- ✅ Connects to MongoDB
- ✅ Clears existing employees and users
- ✅ Creates default admin account
- ✅ Seeds 50 sample employees across all departments

**Default Admin Credentials:**
```
Email:    admin@company.com
Password: Admin@123456
```

**Important:** Run this after setting up MongoDB connection in `.env`

---

## API Documentation

### Base URL
```
http://localhost:5000/api
```

### Standard Response Format

**Success:**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Success message",
  "data": {},
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

**Error:**
```json
{
  "success": false,
  "statusCode": 400,
  "message": "Error message",
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

---

## Authentication Endpoints

### Login User
```
POST /auth/login
Content-Type: application/json
```

**Request Body:**
```json
{
  "email": "admin@company.com",
  "password": "Admin@123456"
}
```

**Response:** `200 OK`
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "user_id",
      "email": "admin@company.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### Get Current User
```
GET /auth/me
Authorization: Bearer {token}
```

### Logout User
```
POST /auth/logout
Authorization: Bearer {token}
```

---

## Employee Endpoints

### Create Employee
```
POST /employees
Authorization: Bearer {token}
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "department": "IT",
  "designation": "Senior Developer",
  "salary": 75000,
  "joiningDate": "2024-01-15",
  "status": "Active",
  "phone": "+1234567890",
  "address": "123 Main St, City"
}
```

**Valid Departments:** HR, IT, Finance, Operations, Marketing, Sales

**Response:** `201 Created`

### Get All Employees
```
GET /employees?page=1&limit=10&search=john&department=IT&status=Active
Authorization: Bearer {token}
```

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `page` | number | Page number (default: 1) |
| `limit` | number | Items per page (default: 10, max: 100) |
| `search` | string | Search by name or email |
| `department` | string | Filter by department |
| `status` | string | Filter by status (Active/Inactive) |

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "employees": [...],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 50,
      "totalPages": 5,
      "hasNext": true,
      "hasPrev": false
    }
  }
}
```

### Get Single Employee
```
GET /employees/:id
Authorization: Bearer {token}
```

### Update Employee
```
PUT /employees/:id
Authorization: Bearer {token}
Content-Type: application/json
```

**Request Body:** (all fields optional)
```json
{
  "name": "Jane Doe",
  "department": "Finance",
  "status": "Inactive"
}
```

### Delete Employee
```
DELETE /employees/:id
Authorization: Bearer {token}
```

### Get Departments List
```
GET /employees/departments/list
Authorization: Bearer {token}
```

---

## Analytics Endpoints

### Dashboard Analytics
```
GET /analytics/dashboard
Authorization: Bearer {token}
```

**Response includes:**
- Total/Active/Inactive employee counts
- Department-wise statistics
- Designation distribution
- Monthly joined employees
- Years of service analysis
- Recently joined employees

### Department Analytics
```
GET /analytics/departments
Authorization: Bearer {token}
```

### Status Report
```
GET /analytics/status-report
Authorization: Bearer {token}
```

---

## Project Structure

```
employee-management-backend/
├── controllers/
│   ├── authController.js
│   ├── employeeController.js
│   └── analyticsController.js
├── models/
│   ├── user.js
│   └── Employee.js
├── routes/
│   ├── authRoutes.js
│   ├── employeeRoutes.js
│   └── analyticsRoutes.js
├── middleware/
│   ├── authMiddleware.js
│   ├── errorHandler.js
│   └── validation.js
├── seeders/
│   └── employeeSeeder.js
├── utils/
│   ├── apiResponse.js
│   └── validators.js
├── .env.example
├── server.js
└── package.json
```

---

## HTTP Status Codes

| Code | Meaning | Use Case |
|------|---------|----------|
| 200 | OK | Successful GET/PUT/DELETE |
| 201 | Created | Successful POST |
| 400 | Bad Request | Validation errors |
| 401 | Unauthorized | Missing/invalid token |
| 403 | Forbidden | Access denied |
| 404 | Not Found | Resource not found |
| 409 | Conflict | Duplicate entry (e.g., email) |
| 500 | Server Error | Internal error |

---

## Rate Limiting

- **Auth endpoints:** 5 requests per 15 minutes
- **Other endpoints:** 100 requests per 15 minutes
- Response includes retry-after header when limit exceeded

---

## Best Practices Implemented

✅ Centralized error handling  
✅ Input validation with Joi schemas  
✅ JWT-based stateless authentication  
✅ Database indexes for performance  
✅ Consistent API response format  
✅ Security headers with Helmet  
✅ Request logging with Morgan  
✅ Clean code organization  

---

## Frontend Integration

### Setup Steps

1. **Install dependencies**
   ```bash
   npm install axios react-router-dom
   ```

2. **Create API client**
   ```javascript
   import axios from 'axios';
   
   const api = axios.create({
     baseURL: 'http://localhost:5000/api'
   });
   
   api.interceptors.request.use((config) => {
     const token = localStorage.getItem('token');
     if (token) {
       config.headers.Authorization = `Bearer ${token}`;
     }
     return config;
   });
   
   export default api;
   ```

3. **Login flow**
   - Call POST `/auth/login`
   - Store token from response
   - Use token in Authorization header

4. **Build features**
   - Employee list with pagination
   - Create/Edit/Delete employees
   - Search and filtering
   - Analytics dashboard

---

## Troubleshooting

### MongoDB Connection Failed
- ✓ Verify MongoDB is running
- ✓ Check MONGO_URI in `.env`
- ✓ Ensure network access (for cloud DB)

### Token Expired
- ✓ User needs to login again
- ✓ Implement refresh token mechanism (optional)
- ✓ Current token validity: 7 days

### Seeder Not Working
- ✓ Ensure MongoDB connection is active
- ✓ Check file path is correct
- ✓ Verify permissions to delete collections

---

## Environment Variables

Create `.env` based on `.env.example`:

```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/employee-db
JWT_SECRET=your_secret_key_here
CLIENT_URL=http://localhost:3000
```

---

## Version History

**v1.0.0** - Initial release  
- ✅ Complete CRUD operations
- ✅ JWT authentication
- ✅ Analytics dashboard
- ✅ Advanced filtering & pagination
- ✅ 50 seed employees included

---

## License

ISC

## Support

For issues, refer to error messages in API responses or check logs in terminal.

---

**Status:** Production Ready 🚀
=======
# employee-management-backend
>>>>>>> 957d4fdf5ccf36b39a4c509b2965f9c4b262e786
