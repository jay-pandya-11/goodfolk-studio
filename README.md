# 🚀 Goodfolk Studio (Full-Stack Monorepo)

A production-grade, full-stack web platform for **Goodfolk Studio** — an independent creative design & custom software engineering consultancy in Bhavnagar, Gujarat.

---

## 📁 Production-Ready Directory Structure

```text
goodfolk-studio/
├── frontend/                     # Next.js 16 + React 19 Frontend
│   ├── app/                      # App router (Home, About, Contact)
│   ├── components/               # React components (Header, Footer, ContactForm)
│   ├── lib/                      # Reusable utilities & API Client
│   │   ├── api-client.ts         # Type-safe client to interact with backend REST API
│   │   └── site-config.ts        # Central studio metadata & coordinates
│   ├── public/                   # Static media, icons & studio photography
│   ├── .env.example              # Frontend environment variables template
│   ├── next.config.ts            # Next.js configuration
│   ├── package.json              # Frontend dependencies & scripts
│   └── tsconfig.json             # TypeScript configuration
│
├── backend/                      # Node.js + Express + MongoDB REST API
│   ├── src/
│   │   ├── config/               # Database connection (db.js) & Env configs (env.js)
│   │   ├── controllers/          # 10 Resource controllers (Auth, Contact, Services, etc.)
│   │   ├── middleware/           # Auth guard, admin check, validation, upload, error handler
│   │   ├── models/               # 8 Mongoose Schemas (User, Contact, Service, Project, etc.)
│   │   ├── routes/               # Express modular route definitions (/api/*)
│   │   ├── seeders/              # Database seeder (seed.js)
│   │   ├── utils/                # Standardized ApiResponse, JWT generator, pagination, etc.
│   │   ├── validators/           # express-validator schemas for input verification
│   │   └── app.js                # Configured Express application
│   ├── uploads/                  # Multer static file upload destination
│   ├── .env                      # Backend environment variables
│   ├── .env.example              # Backend environment template
│   ├── package.json              # Backend dependencies & scripts
│   ├── server.js                 # HTTP server entry point
│   └── test-inprocess.js         # Automated in-process API test runner
│
├── .gitignore                    # Root gitignore
├── package.json                  # Root monorepo scripts runner
└── README.md                     # Project documentation
```

---

## ⚡ Quick Start

### 1. Run Backend (Express API)
```bash
cd backend
npm run dev
# Running on http://localhost:5000
```
The backend uses the local MongoDB server at `mongodb://localhost:27017/goodfolk-studio`
by default. Install and start MongoDB Community Server before launching the API.
`GET /api/health` returns HTTP 503 with `database: "disconnected"` until MongoDB connects.

### 2. Run Frontend (Next.js 16)
```bash
cd frontend
npm run dev
# Running on http://localhost:3000
```

### 3. Run Both Concurrently from Root
```bash
# In goodfolk-studio root
npm run dev
```

### 4. Run Automated API Tests
```bash
cd backend
node test-inprocess.js
# 14 / 14 Tests Passing (100% PASS)
```

---

## 🔑 Environment Configuration

### Frontend (`frontend/.env.local`)
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### Backend (`backend/.env`)
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/goodfolk-studio
JWT_SECRET=replace-with-a-random-secret
JWT_EXPIRE=7d
SMTP_USER=your-smtp-email@example.com
SMTP_PASS=your-smtp-app-password
EMAIL_FROM=noreply@goodfolkstudio.com
FRONTEND_URL=http://localhost:3000
MAX_FILE_SIZE=5242880
```
