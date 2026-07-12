# 🌿 EcoSphere ESG Management & Compliance Platform

EcoSphere is a state-of-the-art enterprise sustainability management platform designed to help organizations plan, monitor, and report their Environmental, Social, and Governance (ESG) footprints. Featuring high-fidelity data visualization dashboards, dynamic role-based access control (RBAC), carbon footprint calculation engines, compliance auditing tools, and gamified CSR tracking.

---

## 🚀 Key Features

* **High-Contrast Glassmorphism Design:** Modern dark-slate aesthetic integrated with custom smooth animation, glowing ambient layout grids, and premium micro-interactions.
* **10-Role RBAC Mapping:** Centralized security routing for specific dashboards:
  * 👑 **Super Admin:** Manage platform configuration, database records, and active domains.
  * 🌿 **ESG Manager:** Track emission baselines, configure global factors, and target goals.
  * 🏢 **Department Head:** Oversee division compliance audits and approve employee logs.
  * 👤 **Employee:** Enlist in CSR volunteer campaigns, earn badges, and log metrics.
  * 🔍 **Auditor:** Review documented digital inspection findings and cert logs.
  * 📊 **Executive:** Overview brief KPI indicators and quarterly statistics.
  * 🌱 **CSR Manager:** Schedule tree plantation and beach cleanup events.
  * ⚖️ **Compliance Officer:** Manage policy risk flags, frameworks, and acknowledgements.
  * 🎮 **Gamification Manager:** Calibrate global XP thresholds, leaderboards, and redeemable store stocks.
  * 👀 **Viewer:** Read-only global sustainability reports access.
* **Live ESG Metrics Ledger:** Log carbon transactions across Scope 1, 2, and 3 activities with custom conversion factors.
* **Gamified CSR & Leaderboards:** Engagement loops rewarding green activities with custom points (XP), badge unlocks, and team ranking tables.

---

## 🛠️ Technology Stack

### Frontend (`/ecosphere-frontend`)
* **Core:** React 18, Vite, React Router DOM v6
* **UI & Styling:** Tailwind CSS, Framer Motion (Transitions), Lucide React (Icons)
* **Context/State:** Centralized Authentication (`AuthContext`) and Toast Notifications (`ToastContext`)

### Backend (`/ecosphere-backend`)
* **Core:** Node.js, Express
* **Database:** MongoDB (Mongoose Schema Modeling)
* **Security:** JSON Web Token (JWT) Access/Refresh lifecycle, Bcrypt (Password Hashing)
* **Tools:** Nodemon (Hot reload)

---

## 📁 Repository Directory Structure

```
e:\EcoSphere ESG Management Platform/
├── ecosphere-backend/        # Node/Express API Server
│   ├── src/
│   │   ├── config/           # Database configurations
│   │   ├── controllers/      # Route handler controllers (Auth, ESG, etc.)
│   │   ├── middleware/       # JWT Auth and RBAC permission checks
│   │   ├── models/           # Mongoose schemas (User, Goals, Trans, etc.)
│   │   ├── routes/           # API Endpoint routes definition
│   │   └── seeds/            # Initial database seed scripts
│   └── server.js             # Main server entrypoint
│
└── ecosphere-frontend/       # Client Web Application
    ├── src/
    │   ├── app/              # Router and top-level entrypoints
    │   ├── components/       # Pages layout, tables, and role-specific views
    │   ├── contexts/         # React system states (Auth/Toasts)
    │   ├── data/             # Offline dummy fallback data files
    │   ├── lib/              # API fetch utility configurations
    │   ├── pages/            # Core login, register, and main dashboard pages
    │   └── ui/               # Reusable premium glassmorphic UI elements
    └── index.html            # SPA Entrypoint HTML
```

---

## 🏁 Quick Setup Guide

### Prerequisites
* [Node.js](https://nodejs.org/) installed (v16+ recommended).
* A running [MongoDB Cluster](https://www.mongodb.com/products/platform/atlas-database) (or local MongoDB).

### Step 1: Configure Environment Variables

**Backend (`/ecosphere-backend/.env`):**
Create/verify the `.env` file in the backend root directory:
```env
PORT=5000
MONGODB_URI=mongodb+srv://<auth_details>
JWT_ACCESS_SECRET=ecosphere_access_secret_super_secure
JWT_REFRESH_SECRET=ecosphere_refresh_secret_ultra_secure
JWT_ACCESS_EXPIRY=15m
JWT_REFRESH_EXPIRY=7d
FRONTEND_URL=http://localhost:5173
```

**Frontend (`/ecosphere-frontend/.env`):**
Create/verify the `.env` file in the frontend root directory:
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

---

### Step 2: Seed & Launch Backend Database Server

```bash
# Navigate to the backend folder
cd ecosphere-backend

# Install dependencies
npm install

# Run database user seeding (Runs a script to create mock roles)
npm run seed

# Run server in developer live reload (runs on Port 5000)
npm run dev
```

---

### Step 3: Launch Frontend Web Application

```bash
# Navigate to the frontend folder
cd ecosphere-frontend

# Install frontend dependencies
npm install

# Run development server (runs on Port 5173 / Localhost)
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser to interact with the platform!

---

## 🛡️ License
Distributed under the MIT License. See `LICENSE` for more information.
