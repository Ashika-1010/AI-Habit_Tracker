# 🚀 AI Habit Tracker

An AI-powered habit tracking application built using the **MERN Stack** and **Google Gemini AI**. The application helps users build consistency, track progress, analyze habit performance, and receive personalized AI-driven insights.

---

## ✨ Features

### 🔐 Authentication

* User Registration
* User Login
* JWT Authentication
* Protected Routes

### 📋 Habit Management

* Create Habits
* Edit Habits
* Delete Habits
* Archive Habits
* Habit Categories
* Custom Colors & Icons

### 📈 Tracking & Analytics

* Daily Habit Tracking
* Completion Logs
* Current Streak Calculation
* Longest Streak Tracking
* Completion Rate Analysis
* 90-Day Activity Heatmap
* Per-Habit Statistics Dashboard

### 🤖 AI Features

* Weekly AI Habit Reports
* Personalized Habit Suggestions
* Habit Recovery Plans
* Morning Motivation Messages
* AI Habit Analysis Chat Assistant

### 🌱 Demo Data

* Seed Script for realistic demo users
* Simulated streaks and streak breaks
* Multiple habit completion patterns
* AI-ready historical data

---

## 🛠 Tech Stack

### Frontend

* React
* Vite
* Tailwind CSS
* Axios
* React Router DOM

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication

### AI Integration

* Google Gemini API

---

## 📂 Project Structure

```text
AI-Habit-Tracker/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── scripts/
│   ├── services/
│   └── utils/
│
├── frontend/
│   └── ui/
│       ├── public/
│       ├── src/
│       └── components/
│
└── README.md
```

---

## ⚙️ Installation

### 1. Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/AI-Habit_Tracker.git
cd AI-Habit_Tracker
```

---

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file using `.env.example`

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
CLIENT_URL=http://localhost:5173
```

Start backend:

```bash
npm run dev
```

---

### 3. Frontend Setup

```bash
cd frontend/ui
npm install
```

Create a `.env` file using `.env.example`

```env
VITE_API_URL=http://localhost:5000/api
```

Start frontend:

```bash
npm run dev
```

---

## 🌱 Seed Demo Data

Generate realistic demo data:

```bash
cd backend
node scripts/seed.js
```

This creates:

* Demo User
* Sample Habits
* Habit Logs
* Streak History
* AI Testing Data

---

## 🔮 Future Improvements

* Email Reminders
* Push Notifications
* Team Challenges
* Social Habit Sharing
* Mobile Application
* Advanced AI Recommendations
* Habit Prediction Models

---

## 👩‍💻 Author

**Ashika Shetty**

Built as a full-stack AI project to explore:

* MERN Stack Development
* Authentication & Authorization
* MongoDB Data Modeling
* REST APIs
* AI Integration with Gemini
* Data Visualization & Analytics

---

## ⭐ Support

If you found this project useful, consider giving it a star on GitHub!
