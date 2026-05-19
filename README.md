# Task Manager API

[![Node.js](https://img.shields.io/badge/Node.js-18.x-green.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-5.x-blue.svg)](https://expressjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-14.x-orange.svg)](https://www.postgresql.org/)
[![JWT](https://img.shields.io/badge/JWT-Auth-purple.svg)](https://jwt.io/)
[![Tests](https://img.shields.io/badge/Tests-96%20passing-brightgreen.svg)]()
[![License: ISC](https://img.shields.io/badge/License-ISC-yellow.svg)](https://opensource.org/licenses/ISC)

## Deskripsi

Task Manager API adalah backend RESTful API untuk aplikasi manajemen task (todo list) dengan sistem authentication dan authorization berbasis role (User & Admin). Dibangun menggunakan **Node.js, Express, dan PostgreSQL** dengan arsitektur MVC yang bersih dan scalable.

## Fitur Lengkap

### Authentication & Authorization
- ✅ Register & Login dengan JWT
- ✅ Password hashing dengan bcrypt
- ✅ Role-based access (User & Admin)
- ✅ Logout dengan token blacklist (in-memory)
- ✅ Middleware untuk proteksi route

### Task Management (User)
- ✅ Create task baru (bisa dengan/tanpa deadline)
- ✅ Read semua task milik sendiri (dengan pagination)
- ✅ Read detail task by ID
- ✅ Update task (title, description, status, deadline)
- ✅ Delete task (hard delete)
- ✅ Soft delete & restore task (tong sampah dengan expiry 30 hari)
- ✅ Filter task by status (pending, in-progress, done)
- ✅ Search task by title
- ✅ Sorting task (by created_at, title, status, deadline_at, updated_at)
- ✅ Deadline task management (set deadline, lihat deadline terdekat, deadline hari ini)
- ✅ Validasi input task

### Admin Dashboard
- ✅ Manage semua users (CRUD)
- ✅ Manage semua task (Read only)
- ✅ Search users by username
- ✅ Search users by public_id
- ✅ Filter users by role (user/admin)
- ✅ Filter task by status
- ✅ Search task by title (admin)
- ✅ Search task by public_id (admin)
- ✅ Pagination untuk users, task, & deleted tasks
- ✅ Soft delete & restore user (dengan expiry 30 hari, task ikut terhapus)
- ✅ Dashboard statistics (total users, tasks, completion rate, dll)
- ✅ Create admin baru

### Security Features
- ✅ JWT token dengan expiry (configurable)
- ✅ Rate limiting (login 5x/15 menit, register 5x/jam, API 100x/menit, admin 200x/menit)
- ✅ Input validation & sanitization (XSS protection)
- ✅ SQL injection protection (parameterized queries)
- ✅ Error handling global (production mode)
- ✅ Helmet & CORS middleware
- ✅ Request timeout (30s default)
- ✅ Request logging dengan Request ID
- ✅ Environment variables

### Monitoring & Maintenance
- ✅ Health check endpoint (`/health`) dengan DB status & memory info
- ✅ Auto-cleanup soft delete expired records (SQL script)
- ✅ Database connection retry (5 retries dengan exponential backoff)

## Tech Stack

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js v5
- **Database:** PostgreSQL
- **Authentication:** JWT (JSON Web Tokens)
- **Password:** bcrypt
- **Validation:** Custom validators
- **Rate Limiting:** express-rate-limit

### Tools & Testing
- **Testing:** Jest & Supertest (96 tests passing)
- **Linting:** ESLint
- **Formatting:** Prettier
- **Version Control:** Git

## API Endpoints

### Health
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Health check (DB status, uptime, memory) |

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/auth/register` | Register user baru |
| POST | `/api/v1/auth/login` | Login |
| POST | `/api/v1/auth/logout` | Logout (auth required) |
| GET | `/api/v1/auth/profile` | Get profile (auth required) |

### Task
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/task` | Create task (auth required) |
| GET | `/api/v1/task` | Get all tasks (auth required) |
| GET | `/api/v1/task/:id` | Get task by ID (auth required) |
| PUT | `/api/v1/task/:id` | Update task (auth required) |
| DELETE | `/api/v1/task/:id` | Hard delete task (auth required) |
| DELETE | `/api/v1/task/:id/soft` | Soft delete task (auth required) |
| POST | `/api/v1/task/:id/restore` | Restore task (auth required) |
| GET | `/api/v1/task/deleted` | Get deleted tasks (paginated, auth required) |
| PUT | `/api/v1/task/:id/deadline` | Set deadline (auth required) |
| GET | `/api/v1/task/deadline/upcoming` | Get tasks by deadline (auth required) |
| GET | `/api/v1/task/deadline/today` | Get tasks due today (auth required) |

### Admin (auth + admin role required)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/admin/create/admins` | Create admin baru |
| GET | `/api/v1/admin/users` | Get all users |
| GET | `/api/v1/admin/users/:id` | Get user by ID |
| GET | `/api/v1/admin/users/username/:username` | Get user by username |
| GET | `/api/v1/admin/task` | Get all tasks |
| GET | `/api/v1/admin/task/:publicId` | Get task by public_id |
| GET | `/api/v1/admin/dashboard` | Dashboard statistics |
| DELETE | `/api/v1/admin/users/:id` | Hard delete user |
| DELETE | `/api/v1/admin/users/:id/soft` | Soft delete user |
| POST | `/api/v1/admin/users/:id/restore` | Restore user |

## Cara Install & Menjalankan

### Prerequisites
- Node.js v18+
- PostgreSQL v14+
- npm atau yarn

### Langkah-langkah

1. **Clone repository**
```bash
git clone https://github.com/username/task-manager-api.git
cd task-manager-api
```

2. **Install dependencies**
```bash
npm install
```

3. **Setup environment**
```bash
cp .env.example .env
```
Edit `.env` dan isi dengan konfigurasi database dan JWT kamu.

4. **Setup database**
```bash
psql -U postgres -d task_manager_db -f src/config/migration.sql
```

5. **Jalankan server**
```bash
# Development (nodemon)
npm run dev

# Production
node src/server.js
```

6. **Run tests**
```bash
npm test
```

### Script yang Tersedia
| Command | Description |
|---------|-------------|
| `npm run dev` | Start server dengan nodemon |
| `npm run lint` | Lint code dengan ESLint |
| `npm run format` | Format code dengan Prettier |
| `npm test` | Run semua tests dengan Jest |

## Struktur Project
```
src/
├── config/
│   ├── db.js              # Database connection + retry
│   ├── migration.sql      # Database schema
│   ├── seed.sql           # Sample data
│   └── cleanup.sql        # Auto-cleanup expired records
├── controllers/           # Request handlers
├── middlewares/
│   ├── adminMiddleware.js # Role-based access
│   ├── authMiddleware.js  # JWT verification
│   ├── errorHandler.js    # Global error handler
│   ├── rateLimiter.js     # Rate limiting
│   ├── requestLogger.js   # Request logging + Request ID
│   ├── sanitize.js        # Input sanitization (XSS)
│   ├── security.js        # Helmet & CORS
│   └── timeout.js         # Request timeout
├── models/                # Database queries
├── routes/                # API route definitions
├── services/              # Business logic
├── utils/                 # Helper functions (JWT, AppError, etc)
├── validators/            # Input validation
├── app.js                 # Express app setup
└── server.js              # Server entry point
test/
├── integration/           # API integration tests
├── middlewares/           # Middleware unit tests
├── utils/                 # Utility unit tests
├── validators/            # Validator unit tests
└── setup.js               # Test environment setup
```
