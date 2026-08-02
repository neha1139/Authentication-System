# 🔐 Authentication System

A full-stack **Authentication System** built using **Node.js, Express.js, MySQL, HTML, CSS, Bootstrap, and JavaScript**.

This project demonstrates a secure authentication workflow where users can register, log in, manage their profiles, update passwords, and maintain authenticated sessions. Passwords are securely hashed using **bcrypt**, while user authentication is managed through **Express Session**.

The project was developed to gain practical experience with backend development, authentication, session management, REST APIs, and secure user data handling.

---

## ✨ Features

- 👤 User Registration
- 🔑 Secure User Login
- 🔒 Password Hashing using bcrypt
- 🛡️ Session-based Authentication
- 🚫 Protected Dashboard
- 👤 View User Profile
- ✏️ Edit Profile Information
- 🔄 Change Password
- ✅ Frontend Validation
- ✅ Backend Validation
- 📧 Duplicate Email Validation
- 🚪 Secure Logout

---

## 🛠️ Tech Stack

### Frontend
- HTML5
- CSS3
- Bootstrap 5
- JavaScript

### Backend
- Node.js
- Express.js

### Database
- MySQL

### Authentication & Security
- bcrypt
- express-session

---

## 📚 What I Learned

Through this project, I gained hands-on experience with:

- Building RESTful APIs using Express.js
- User Authentication & Authorization
- Password Hashing with bcrypt
- Session Management using Express Session
- MySQL Database Integration
- CRUD Operations
- Express Middleware
- Frontend & Backend Validation
- Fetch API
- Project Structure and Code Organization

---

## 🚀 Installation

### 1. Clone the repository

```bash
git clone https://github.com/neha1139/Authentication-System.git
```

### 2. Navigate to the project folder

```bash
cd Authentication-System
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure MySQL

- Create the required database.
- Import the project tables.
- Update your MySQL credentials in `database/connection.js`.

### 5. Start the server

```bash
node app.js
```

> *(Use `node server.js` only if your entry file is actually named `server.js`. If it's `app.js`, use `node app.js`.)*

### 6. Open your browser

```
http://localhost:3000
```

---

## 📂 Project Structure

```text
Authentication-System
│
├── database
│   └── connection.js
│
├── public
│   ├── css/
│   ├── js/
│   ├── index.html
│   ├── login.html
│   ├── register.html
│   └── dashboard.html
│
├── app.js
├── package.json
└── README.md
```

---




## 🔮 Future Improvements

- 🔐 JWT Authentication
- 📩 Email Verification
- 🔄 Forgot Password & Reset Password
---

