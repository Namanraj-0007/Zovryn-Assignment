# Finance Management Backend API

**Full-stack developer portfolio project - Production ready Node.js/Express/MongoDB backend with JWT RBAC**

## ✨ Features Implemented

**Authentication & Authorization**
- JWT token based auth
- Role-based access: `viewer` | `analyst` | `admin`
- bcrypt password hashing
- Secure middleware stack

**Financial Records API**
```
CRUD operations + pagination + advanced filtering (date/category/type)
MongoDB aggregation for analytics dashboard
Real-time category summaries & balance calculations
```

**Enterprise Security**
- Helmet middleware
- CORS protection
- Input validation (express-validator)
- Global error handler

## 🛠 Tech Stack
```
Node.js 20+ | Express.js | MongoDB | Mongoose ODM | JWT | bcrypt
```

## 🚀 Quickstart

```bash
git clone <your-repo> finance-backend
cd finance-backend
npm install
cp .env.example .env
# Edit MONGO_URI and JWT_SECRET in .env
npm run dev
```

**API Server**: `http://localhost:5000`

## 📋 API Routes

### Auth
```
POST  /api/auth/register  → Create admin/analyst/viewer account
POST  /api/auth/login     → JWT token
GET   /api/auth/users     → Admin only (role management)
```

### Records (Complete CRUD)
```
POST  /api/records           Admin → Create
GET   /api/records?page=1    Auth → List + filter
PUT   /api/records/:id       Admin → Update
DELETE /api/records/:id     Admin → Delete
```

### Dashboard Analytics
```
GET /api/dashboard/summary → Analyst/Admin → Total income/expense/net + categories + recent 5 txns
```

## 🎯 Role Permissions Matrix

| Feature | Viewer | Analyst | Admin |
|---------|--------|---------|-------|
| Records Read | ✅ | ✅ | ✅ |
| Dashboard | | ✅ | ✅ |
| Records Write | | | ✅ |
| User Management | | | ✅ |

## 💾 Sample Usage

**Register Admin:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
-H "Content-Type: application/json" \
-d '{"name":"Admin","email":"admin@finance.com","password":"admin123","role":"admin"}'
```

**Add Income Record:**
```bash
curl -X POST http://localhost:5000/api/records \
-H "Authorization: Bearer YOUR_TOKEN" \
-H "Content-Type: application/json" \
-d '{"amount":2500,"type":"income","category":"Salary"}'
```

## 🔍 Advanced Filtering
```
GET /api/records?type=income&startDate=2024-01-01&endDate=2024-06-30&category=S&limit=20&page=1
```

## 🏗 Project Structure (Clean Architecture)
```
src/
├── controllers/    Business logic
├── middleware/     Auth/Validation
├── models/         Mongoose schemas  
├── routes/         Express routers
├── config/         DB connection
└── utils/          Helpers
```

## 📊 Dashboard Response Example
```json
{
  "totalIncome": 12500,
  "totalExpense": 3200,
  "netBalance": 9300,
  "categoryTotals": {"Salary":2500,"Food":-800},
  "recentTransactions": [...]
}
```

## 🔐 Security Features
- Rate limiting ready
- JWT expires in 30 days
- Password min 6 chars
- XSS protection (helmet)
- SQL injection safe (Mongoose)

## 🚀 Docker Deployment
```bash
docker-compose up --build
```

**Made with ❤️ by Namandip Raj | namandipraj@portfolio.com**
