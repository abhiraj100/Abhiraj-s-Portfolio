# 🚀 Abhiraj Yadav Portfolio — MERN Backend

Production-ready Node.js, Express, and MongoDB backend supporting the portfolio with real-time email dispatch (via Nodemailer), message persistence, database seeding, rate-limiting, and RESTful APIs.

---

## 🛠️ Tech Stack & Architecture

- **Runtime**: Node.js (ES Modules)
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Email Service**: Nodemailer (Gmail App Passwords or custom SMTP)
- **Security & Reliability**: Helmet, CORS, Express-Rate-Limit, Validator
- **Logging**: Morgan HTTP logger + custom colorized logger

---

## 📁 Directory Structure

```
backend/
├── app.js                   # Express application setup & middleware configuration
├── server.js                # Server entry point & startup listener
├── package.json             # Backend dependencies & npm scripts
├── .env                     # Local environment variables
├── .env.example             # Documented template for environment variables
├── scripts/
│   ├── seed.js              # Database seeder (npm run seed)
│   └── testEmail.js         # SMTP diagnostic tester (npm run test:email)
└── src/
    ├── config/
    │   ├── db.js            # Resilient MongoDB connection & health check
    │   ├── env.js           # Environment variable loader
    │   └── mailer.js        # Nodemailer setup, verification, & auto-reply dispatcher
    ├── controllers/
    │   ├── contactController.js     # Form submission, email dispatch, admin message queries
    │   ├── projectController.js     # Projects retrieval & admin management
    │   ├── skillController.js       # Skills toolkit endpoints
    │   ├── experienceController.js  # Career experience endpoints
    │   └── healthController.js      # System health and connection diagnostic
    ├── data/
    │   └── seedData.js      # Initial seed dataset matching Abhiraj's portfolio
    ├── middleware/
    │   ├── errorHandler.js  # Standardized error handling & async wrapper
    │   ├── rateLimiter.js   # Anti-spam rate limiting
    │   └── validateContact.js # Input sanitization & bot honeypot protection
    ├── models/
    │   ├── Message.js       # Mongoose model for contact submissions
    │   ├── Project.js       # Mongoose model for projects
    │   ├── Skill.js         # Mongoose model for skill sets
    │   └── Experience.js    # Mongoose model for work history
    └── utils/
        ├── emailTemplates.js # Responsive HTML templates (Admin notification & Auto-reply)
        └── logger.js        # Terminal logger with timestamps
```

---

## ⚙️ Configuration (`.env`)

Copy `.env.example` to `.env` (or edit existing `backend/.env`):

```env
PORT=5001
NODE_ENV=development
CLIENT_URL=http://localhost:5173

# MongoDB Connection
MONGODB_URI=mongodb://127.0.0.1:27017/abhiraj_portfolio

# Email Configuration
RECIPIENT_EMAIL=abhirajyadav303@gmail.com
EMAIL_SERVICE=gmail
EMAIL_USER=abhirajyadav303@gmail.com
EMAIL_PASS=your_16_character_app_password

# Admin API Key for accessing submitted messages
ADMIN_API_KEY=abhiraj_super_secret_admin_key_2026
```

---

## 📧 How to Setup Gmail App Password for Sending Emails

To enable Nodemailer to send emails directly to `abhirajyadav303@gmail.com` and deliver automated confirmation emails to visitors:

1. Go to your **[Google Account](https://myaccount.google.com/)**.
2. Navigate to **Security** &rarr; Ensure **2-Step Verification** is turned **ON**.
3. In the search bar at the top of the Google Account page, search for **"App passwords"** (or visit `https://myaccount.google.com/apppasswords`).
4. Enter an app name like **"Portfolio Backend"** and click **Create**.
5. Google will display a **16-character password** (e.g., `abcd efgh ijkl mnop`).
6. Copy that 16-character code into `backend/.env`:
   ```env
   EMAIL_PASS=abcdefghijklmnop
   ```
7. Run the test email diagnostic to verify:
   ```bash
   npm run test:email
   ```

> **Note**: If `EMAIL_PASS` is not yet configured, the backend runs in **graceful simulation mode** — contact submissions are safely stored in MongoDB and printed to the server terminal, so no messages are ever lost!

---

## 🚀 Available Scripts

From inside the `backend/` directory:

- `npm run dev`: Starts the server with Nodemon auto-reload on port 5001
- `npm start`: Starts the server in production mode
- `npm run seed`: Seeds MongoDB with Abhiraj's actual projects, skills, and experience
- `npm run test:email`: Tests your Gmail App Password / SMTP credentials

---

## 📡 REST API Reference

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Health diagnostic check (DB status, mailer status, uptime) |
| `POST` | `/api/contact` | Submit contact message (saves to DB + sends emails) |
| `GET` | `/api/contact/messages` | Admin query of all messages (requires `x-admin-key` header) |
| `GET` | `/api/contact/messages/:id` | View specific message by ID |
| `POST` | `/api/contact/test-email` | Diagnostic email dispatch test |
| `GET` | `/api/projects` | Fetch all portfolio projects |
| `GET` | `/api/skills` | Fetch all skills toolkit data |
| `GET` | `/api/experience` | Fetch work experience timeline |
