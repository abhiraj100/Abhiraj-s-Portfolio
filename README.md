# 🌟 Abhiraj Yadav — Full-Stack MERN Portfolio

A modern, high-performance portfolio showcasing full-stack engineering, AI/GenAI integrations, cloud workflows, and digital products. Built with **React 19, Vite, Tailwind CSS, Framer Motion**, and a robust **Node.js, Express, MongoDB, and Nodemailer** backend.

---

## ⚡ Quick Start

### 1. Install Dependencies
```bash
# In the root repository:
npm run install:all
```

### 2. Configure Environment Variables

**Backend (`backend/.env`):**
```bash
cd backend
cp .env.example .env
```
*(Add your Gmail 16-character App Password to `EMAIL_PASS` in `backend/.env` to enable real-time email notifications).*

**Frontend (`frontend/.env`):**
```bash
cd frontend
cp .env.example .env
```
*(Leave empty for local development — Vite automatically proxies `/api` to `http://localhost:5001`).*

### 3. Run Development Servers
From the root repository:
```bash
npm run dev
```
- **Frontend**: [http://localhost:5173](http://localhost:5173)
- **Backend API**: [http://localhost:5001](http://localhost:5001)
- **Health Check**: [http://localhost:5001/api/health](http://localhost:5001/api/health)

---

## 🏗️ Architecture

```
Abhiraj-s-Portfolio/
├── backend/                  # Node.js, Express & MongoDB REST API
│   ├── src/
│   │   ├── config/           # Database & Nodemailer transporter
│   │   ├── controllers/      # Contact, projects, skills, experience, health
│   │   ├── middleware/       # Rate limiting, honeypot validation, error handlers
│   │   ├── models/           # Mongoose schemas (Message, Project, Skill, Experience)
│   │   └── utils/            # HTML email templates & logger
│   └── scripts/              # Seed database & test email
│
├── frontend/                 # React 19 + Vite + Tailwind CSS SPA
│   ├── src/
│   │   ├── assets/           # Profile images, screenshots, and PDF resume
│   │   ├── App.jsx           # Portfolio components & contact form
│   │   └── index.css         # Styling, glassmorphism, & animations
│   └── vite.config.js        # Vite config with /api proxy to backend
│
└── package.json              # Monorepo unified dev runner
```

---

## 📧 Contact & Email Features

- **MongoDB Persistence**: Every submission is saved to MongoDB (with graceful in-memory storage fallback if MongoDB is offline).
- **Dual Nodemailer Dispatch**:
  1. **Admin Notification**: Formatted dark-themed HTML email delivered to Abhiraj's inbox with direct reply links.
  2. **Visitor Confirmation**: Automated confirmation email sent to the sender confirming receipt.
- **Bot Protection**: Honeypot anti-spam check and IP rate-limiting.
- **Fail-Safe Design**: If SMTP is not yet configured, the system logs the message and preview to console without throwing errors or failing the frontend experience.

---

## 🛠️ Helpful Scripts

- `npm run dev`: Runs frontend and backend concurrently
- `npm run dev:frontend`: Runs Vite dev server
- `npm run dev:backend`: Runs Express dev server with Nodemon
- `npm run seed`: Seeds MongoDB with portfolio data
- `npm run test:email`: Tests your Gmail App Password / SMTP credentials
- `npm run build`: Generates production client bundle
