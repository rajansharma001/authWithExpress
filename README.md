# 🛡️ Express + JWT Authentication System (with MongoDB & Cookies)

This project is a secure authentication system built using **Node.js**, **Express.js**, **TypeScript**, **JWT**, **MongoDB**, and **Cookies**.  
It supports role-based authorization with protected routes for normal users and admins.

---

## 📦 Features

- ✅ User Registration & Login
- ✅ JWT Authentication
- ✅ HttpOnly Cookie Storage
- ✅ Role-based Protected Routes
- ✅ Middleware for Token & Role Verification
- ✅ Password Hashing with bcrypt
- ✅ Environment Variables via `.env`

---

## 🗂️ Tech Stack

- **Backend**: Node.js, Express.js, TypeScript
- **Database**: MongoDB + Mongoose
- **Auth**: JWT (stored in cookies)
- **Security**: bcrypt for password hashing

---

## 📁 Folder Structure

```
├── controllers/
│   └── authController.ts
├── middleware/
│   ├── isAdmin.ts
│   └── verifyToken.ts
    └── validateLoginInput.ts
    └── validateSignupInputs.ts
├── model/
│   └── userSchema.ts
├── router/
│   └── route.ts
├── .env
├── app.ts
```

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/rajansharma001/authWithExpress.git
cd your-repo-name
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create `.env` file

```
PORT=8000
MONGODB_URI=your_mongodb_connection_string
TOKEN_SECRET=your_jwt_secret_key
```

### 4. Run the app

```bash
npm run dev
```

---

## 🔐 API Routes

### 🔸 Public Routes:

- `POST /api/auth/register` – Register new user
- `POST /api/auth/login` – Login user & set JWT cookie
- `GET /about` – Get all users

### 🔒 Protected Routes (Token Required):

- `GET /` – Get current logged-in user (via middleware)

### 🔒 Admin-Only Route:

- `GET /admin/dashboard` – Accessible only by admin users

---

## ✅ Example User Payload in JWT

```json
{
  "id": 1,
  "name": "RajanSharma",
  "email": "rajan@example.com",
  "role": "admin",
  "iat": 1750318903,
  "exp": 1750322503
}
```

---

## 🧪 Tools Used

- `jsonwebtoken`
- `bcryptjs`
- `cookie-parser`
- `dotenv`
- `mongoose`
- `express`

---

## ✍️ Author

Made with ❤️ by **Rajan Sharma**
