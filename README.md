# Passport Authentication App

This project demonstrates various authentication strategies using Passport.js. It includes local authentication (username/password) and social authentication via Google, Facebook, and GitHub. The backend is built with Node.js and Express, while the frontend uses React and Material-UI.
![image](https://github.com/user-attachments/assets/524b017a-db4a-4617-9d07-3a79060e6072)

## Technologies Used

### Backend:
- **Node.js**
- **Express.js**
- **MongoDB** (for user data storage)
- **Passport.js** (authentication)

### Frontend:
- **React.js**
- **Vite** (for fast development)
- **Material-UI** (UI components)

## Setup Instructions

### 1. Clone the Repository
```sh
git clone https://github.com/Mohamed-Messaoudene/passport-authentication-app.git
cd passport-authentication-app
```

### 2. Install Dependencies
#### Backend (Server)
```sh
cd server
npm install
```
#### Frontend (Client)
```sh
cd ../client
npm install
```

### 3. Environment Variables

Create `.env` files for both client and server.

#### `.env` in `client/` (Frontend):
by default (http://localhost:5000)
```
VITE_SERVER_URL=
```

#### `.env` in `server/` (Backend):
so get all these keys and URLs and placed here !
```
DB_CONNECTION_URI=
CLIENT_URL=
SESSION_SECRET_KEY=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
FACEBOOK_CLIENT_ID=
FACEBOOK_CLIENT_SECRET=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
```

### 4. Running the Project
#### Start the Backend Server
```sh
cd server
npm start
```

#### Start the Frontend
```sh
cd ../client
npm run dev
```

### 5. Accessing the Application
- Backend: `http://localhost:5000`
- Frontend: `http://localhost:5173`

## Features
- User Registration & Login (Local + OAuth)
- Social Authentication with Google, Facebook, and GitHub
- Session Management using `express-session`
- Secure API with CORS and Content Security Policies
## 📬 Contact  

- **👤 Name:** Messaoudene Mohamed
- **📧 Email:** [messaoudenemohamed54@gmail.com]  
- **🔗 GitHub:** [https://github.com/Mohamed-Messaoudene/]
- **🔗 LinkedIn:** [www.linkedin.com/in/mohamed-messaoudene-ab595a269]  

