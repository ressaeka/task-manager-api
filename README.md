# Task Manager API

[![Node.js](https://img.shields.io/badge/Node.js-18.x-green.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-5.x-blue.svg)](https://expressjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-14.x-orange.svg)](https://www.postgresql.org/)
[![JWT](https://img.shields.io/badge/JWT-Auth-purple.svg)](https://jwt.io/)
[![Tests](https://img.shields.io/badge/Tests-14%20suites-brightgreen.svg)]()
[![ESLint](https://img.shields.io/badge/ESLint-Passing-4B32C3.svg)](https://eslint.org/)
[![License: ISC](https://img.shields.io/badge/License-ISC-yellow.svg)](https://opensource.org/licenses/ISC)

## Deskripsi

Task Manager API adalah backend RESTful API untuk aplikasi manajemen task (todo list) dengan sistem authentication dan authorization berbasis role (User & Admin). Dibangun menggunakan **Node.js, Express, dan PostgreSQL** dengan arsitektur MVC, custom error handling, input validation, dan comprehensive testing.

---

## Mengapa Aplikasi Ini Dikembangkan?

Aplikasi ini dikembangkan sebagai **proyek pembelajaran dan portofolio** untuk menguasai pengembangan backend RESTful API yang _production-ready_ menggunakan Node.js, Express, dan PostgreSQL. Tujuan utamanya:

| Tujuan | Detail |
|--------|--------|
| 🎯 **Penguasaan Arsitektur MVC** | Memisahkan concern antara Routes, Controllers, Services, dan Models agar kode terstruktur, testable, dan mudah dipelihara |
| 🛡️ **Implementasi Keamanan API** | Menerapkan JWT authentication, role-based authorization, rate limiting, input sanitization, helmet, CORS, dan error handling yang konsisten |
| 🧪 **Testing & Quality Assurance** | Menulis comprehensive test (integration + unit) menggunakan Jest & Supertest untuk memastikan reliability |
| 🗄️ **Database Design & Optimization** | Merancang skema PostgreSQL dengan indexing, constraint, trigger, dan parameterized query untuk performa & keamanan |
| 🔄 **Soft Delete & Data Lifecycle** | Mengimplementasikan soft delete dengan expiry otomatis (30 hari) dan restore mechanism |
| 🔧 **Error Handling & Logging** | Custom error class, global error handler (production mode menyembunyikan stack trace), dan request logging dengan Request ID |

---

## Dampak untuk Masyarakat

| Dampak | Positif | Negatif |
|--------|---------|---------|
| **Produktivitas** | Membantu individu & tim mengelola task secara terstruktur, meningkatkan efisiensi kerja | Ketergantungan pada aplikasi bisa mengurangi kemampuan mengingat & mengatur secara mandiri |
| **Edukasi & Portofolio** | Menjadi referensi belajar open-source bagi developer yang ingin mempelajari arsitektur MVC, Express, PostgreSQL, dan testing | Dokumentasi & code comments masih minim, menyulitkan pemula yang baru belajar |
| **Aksesibilitas** | Gratis dan open-source — siapa saja bisa menginstall, memodifikasi, dan menggunakan tanpa biaya lisensi | Membutuhkan pengetahuan teknis (Node.js, PostgreSQL) untuk setup, tidak bisa langsung dipakai oleh non-developer |
| **Keamanan Data** | Data tersimpan di database sendiri (self-hosted) — privasi terjaga dan tidak bergantung pada pihak ketiga | Tanggung jawab keamanan sepenuhnya di tangan pengguna (harus update, backup, dan konfigurasi sendiri) |
| **Dunia Kerja** | Melatih disiplin deadline, prioritas tugas, dan manajemen waktu — skill yang langsung relevan di dunia profesional | Belum ada fitur kolaborasi tim, hanya untuk use-case personal/single user |
| **Ekonomi Digital** | Mendorong adopsi teknologi digital dalam kehidupan sehari-hari dengan biaya nol | Belum terintegrasi dengan ekosistem produktivitas lain (Google Calendar, Slack, Notion, dll) |

---

## Kelebihan (Positif)

| Aspek | Kelebihan |
|-------|-----------|
| **Arsitektur** | MVC clean architecture dengan pemisahan Routes → Controllers → Services → Models yang jelas, memudahkan scaling & maintenance |
| **Keamanan** | Multi-layer security: Helmet, CORS, JWT auth, role-based access, rate limiting (login 5x/15menit, register 5x/jam, API 100x/menit), input sanitization, parameterized query (anti SQL injection) |
| **Soft Delete** | Implementasi soft delete lengkap dengan expiry 30 hari dan restore mechanism untuk user & task, mencegah kehilangan data permanen |
| **Deadline Management** | Fitur deadline task dengan filter hari ini & upcoming, validasi deadline tidak boleh kurang dari hari ini |
| **Error Handling** | Custom AppError class + global error handler + ValidationError, response error konsisten sepanjang aplikasi |
| **Testing** | 14 file test (integration + unit) dengan Jest + Supertest, mencakup auth, task, admin, middleware, utils, validators |
| **Logging & Monitoring** | Request logging dengan UUID (X-Request-ID), health check endpoint dengan info DB status, uptime, memory |
| **Graceful Shutdown** | Menangani SIGINT/SIGTERM dengan rapi — tutup koneksi database sebelum server mati |
| **Rate Limiting** | 4 tier rate limiter berbeda untuk login, register, API umum, dan admin — mencegah brute force & abuse |
| **Pagination & Filtering** | Pagination, search by title, filter by status, sorting multi-column pada task dan users |

## Kekurangan (Negatif)

| Aspek | Dampak Negatif untuk Masyarakat | Rencana Perbaikan |
|-------|--------------------------------|-------------------|
| **Frontend** | Tidak bisa dipakai masyarakat non-teknis — hanya developer yang bisa akses via API | Prioritas 1: Bangun frontend (React/Vue) agar accessible untuk semua |
| **Kolaborasi Tim** | Hanya untuk personal — belum bisa kolaborasi antar user dalam satu project | Rencana: Shared workspace & team management |
| **Integrasi Eksternal**| Tidak sinkron dengan Google Calendar, Slack, atau tools lain — terisolasi | Rencana: Integrasi API eksternal + export/import data |
| **Notifikasi** | Tidak ada pengingat deadline — user harus selalu ngecek manual | Prioritas 8: WebSocket + email reminder |
| **Setup Rumit** | Masyarakat awam tidak bisa install sendiri — perlu pengetahuan teknis | Prioritas 4: Docker + one-click deploy |
| **Sesi Hilang** | Token blacklist in-memory — data login hilang saat server restart | Prioritas 3: Redis agar persist |
| **Recovery Akun** | Tidak ada forgot password — user yang lupa password tidak bisa login | Prioritas 6: Reset password via email |
| **Skalabilitas** | Belum ada caching / load balancing — performa turun jika banyak user | Rencana: Redis caching + query optimization |
| **Mobile** | Belum ada mobile app / PWA — hanya via browser | Rencana: PWA atau React Native |
| **Dokumentasi**| Developer lain kesulitan mempelajari API tanpa dokumentasi interaktif | Prioritas 5: Swagger/OpenAPI |

> ℹ️  Detail prioritas pengembangan ada di [`dokumentasi.md`](./dokumentasi.md).

---

## Fitur Lengkap

### Authentication & Authorization
- ✅ Register & Login dengan JWT
- ✅ Password hashing dengan bcrypt
- ✅ Role-based access (User & Admin)
- ✅ Logout dengan token blacklist (in-memory auto-cleanup tiap 15 menit)
- ✅ Middleware untuk proteksi route
- ✅ Environment variable validation saat startup

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
- ✅ Validasi input task (custom validators + ValidationError)

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
- ✅ JWT token dengan expiry (configurable via `JWT_EXPIRES_IN`)
- ✅ Rate limiting (login 5x/15 menit, register 5x/jam, API 100x/menit, admin 200x/menit)
- ✅ Input validation & sanitization (XSS protection via strip tags)
- ✅ SQL injection protection (parameterized queries)
- ✅ Global error handler (production mode menyembunyikan stack trace)
- ✅ Helmet & CORS middleware
- ✅ Request timeout (30s default, configurable)
- ✅ Request logging dengan Request ID (UUID)
- ✅ Graceful shutdown (SIGINT/SIGTERM)
- ✅ Custom AppError class untuk consistent error response
- ✅ Environment variables dengan validation di startup

### Monitoring & Maintenance
- ✅ Health check endpoint (`/health`) dengan DB status, uptime, & memory info
- ✅ Auto-cleanup soft delete expired records (SQL script: `src/config/cleanup.sql`)
- ✅ Database connection retry (5 retries dengan exponential backoff)
- ✅ Database schema migration (`src/config/migration.sql`)
- ✅ Sample seed data (`src/config/seed.sql`)

## Tech Stack

### Backend
- **Runtime:** Node.js v18+
- **Framework:** Express.js v5
- **Database:** PostgreSQL dengan `pg` (parameterized queries)
- **Authentication:** JWT (jsonwebtoken) dengan blacklist
- **Password:** bcrypt
- **Validation:** Custom validators + ValidationError class
- **Rate Limiting:** express-rate-limit
- **Error Handling:** Custom AppError class

### Tools & Testing
- **Testing:** Jest + Supertest (14 test files — integration, middlewares, utils, validators)
- **Linting:** ESLint v10 (flat config + recommended rules)
- **Formatting:** Prettier (single quotes, trailing commas, 80 print width)
- **Runtime:** Nodemon (dev), ES Modules (`"type": "module"`)

## API Endpoints

### Health (no auth)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Health check (DB status, uptime, memory) |

### Auth
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/v1/auth/register` | - | Register user baru |
| POST | `/api/v1/auth/login` | - | Login |
| POST | `/api/v1/auth/logout` | ✅ | Logout (blacklist token) |
| GET | `/api/v1/auth/profile` | ✅ | Get profile |

### Task
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/v1/task` | ✅ | Create task |
| GET | `/api/v1/task` | ✅ | Get all tasks (paginated) |
| GET | `/api/v1/task/deleted` | ✅ | Get soft-deleted tasks |
| GET | `/api/v1/task/deadline/upcoming` | ✅ | Tasks by deadline |
| GET | `/api/v1/task/deadline/today` | ✅ | Tasks due today |
| GET | `/api/v1/task/:id` | ✅ | Get task by ID |
| PUT | `/api/v1/task/:id` | ✅ | Update task |
| PUT | `/api/v1/task/:id/deadline` | ✅ | Set deadline |
| DELETE | `/api/v1/task/:id` | ✅ | Hard delete |
| DELETE | `/api/v1/task/:id/soft` | ✅ | Soft delete |
| POST | `/api/v1/task/:id/restore` | ✅ | Restore task |

### Admin (auth + admin role required)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/admin/create/admins` | Create admin baru |
| GET | `/api/v1/admin/dashboard` | Dashboard statistics |
| GET | `/api/v1/admin/users` | Get all users |
| GET | `/api/v1/admin/users/:id` | Get user by ID |
| GET | `/api/v1/admin/users/username/:username` | Get user by username |
| GET | `/api/v1/admin/task` | Get all tasks |
| GET | `/api/v1/admin/task/:publicId` | Get task by public_id |
| DELETE | `/api/v1/admin/users/:id` | Hard delete user |
| DELETE | `/api/v1/admin/users/:id/soft` | Soft delete user |
| POST | `/api/v1/admin/users/:id/restore` | Restore user |

## Cara Install & Menjalankan

### Prerequisites
- Node.js v18+
- PostgreSQL v14+
- npm

### Langkah-langkah

1. **Clone repository**
```bash
git clone https://github.com/ressaeka/task-manager-api.git
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
# Buat database
createdb task_manager

# Jalankan migration
psql -U postgres -d task_manager -f src/config/migration.sql

# (Opsional) Seed data sample
psql -U postgres -d task_manager -f src/config/seed.sql
```

5. **Jalankan server**
```bash
# Development (dengan nodemon)
npm run dev

# Production
NODE_ENV=production node src/server.js
```

6. **Run tests**
```bash
npm test
```

### Script yang Tersedia
| Command | Description |
|---------|-------------|
| `npm run dev` | Start server dengan nodemon (development) |
| `npm run lint` | Lint code dengan ESLint |
| `npm run format` | Format code dengan Prettier |
| `npm test` | Run semua tests (Jest, in-band, force exit) |

## Struktur Project
```
src/
├── config/
│   ├── db.js              # Database connection pool + retry logic
│   ├── migration.sql      # Database schema (DDL)
│   ├── seed.sql           # Sample data untuk development
│   └── cleanup.sql        # Auto-cleanup soft-deleted records
├── controllers/           # Request handlers (auth, task, admin)
├── middlewares/
│   ├── adminMiddleware.js  # Role-based access control
│   ├── authMiddleware.js   # JWT verification
│   ├── errorHandler.js     # Global error handler (AppError-aware)
│   ├── rateLimiter.js      # Rate limiting (login, register, API, admin)
│   ├── requestLogger.js    # Request logging + X-Request-ID
│   ├── sanitize.js         # Input sanitization (XSS protection)
│   ├── security.js         # Helmet + CORS configuration
│   └── timeout.js          # Request timeout middleware
├── models/                # Database queries (users, task, admin)
├── routes/                # Route definitions (auth, task, admin, health)
├── services/              # Business logic layer
├── utils/
│   ├── AppError.js        # Custom error class
│   ├── jwt.js             # Token generation, verification, blacklist
│   ├── parseId.js         # Nanoid parsing helper
│   ├── response.js        # Standardized response helpers
│   └── userHelpers.js     # User utility functions
├── validators/
│   ├── authValidator.js   # Auth input validation
│   ├── queryValidator.js  # Query parameter validation
│   ├── taskValidator.js   # Task input validation
│   └── ValidationError.js # Custom validation error class
├── app.js                 # Express app setup & middleware pipeline
└── server.js              # Server entry point (env validation, graceful shutdown)
test/
├── integration/           # API integration tests (auth, task, admin)
├── middlewares/           # Middleware unit tests
├── utils/                 # Utility unit tests
├── validators/            # Validator unit tests
└── setup.js               # Jest setup (test DB, env)
```
