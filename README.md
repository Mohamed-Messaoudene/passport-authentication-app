# Passport Authentication Project
  <div>
    <img src="https://github.com/user-attachments/assets/5849a007-b62f-4ff2-9197-5a3b1b6fc5c6" alt="register" width="33%" height="200" />
    <img src="https://github.com/user-attachments/assets/341b614e-d9ac-4487-801d-a3907459bd79" alt="login" width="33%" height="200" />
    <img src="https://github.com/user-attachments/assets/c62dbad1-73fa-4085-baaf-5c5f9dfd6122" alt="image" width="33%" height="200" />

  </div>


## Features

#### Multi-Provider Authentication
- Supports user authentication via multiple strategies: **Local (username and password), Google, Facebook, and GitHub**.
- Offers a seamless login experience with social platforms.
#### Secure User Registration and Login
- Local authentication uses bcrypt to hash and securely store user passwords.
#### OAuth 2.0 Integration
- Implements OAuth 2.0 protocol for Google, Facebook, and GitHub login.
- Access user profile information from social platforms with permission.
#### Session Management
- Sessions persist across multiple requests for a smooth user experience.
#### Responsive Error Handling
- Provides clear feedback for authentication errors, such as invalid credentials or missing profile information.
#### Profile Picture Integration
- Automatically retrieves profile pictures from social providers (Google, Facebook, GitHub) for a personalized user experience.
  
## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) 
- [MongoDB](https://www.mongodb.com/)
- A GitHub, Google, and Facebook Developer account to obtain the necessary credentials.

### Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Mohamed-Messaoudene/passport-authentication-app.git
   cd passport-authentication-app

2. **Install dependencies:**
   You will need to install the dependencies for both the client and server folders:
    ```bash
     # In the root directory
     cd client
     npm install
     # In the server directory
     cd ../server
     npm install

3. **Set up environment variables:**
   Create a .env file in the server directory and configure your environment variables:
    ```
     CLIENT_URL=<example : "http://localhost:5173">
     DB_CONNECTION_URI=<Your MongoDB connection string>
     GOOGLE_CLIENT_ID=<Your Google Client ID>
     GOOGLE_CLIENT_SECRET=<Your Google Client Secret>
     FACEBOOK_CLIENT_ID=<Your Facebook Client ID>
     FACEBOOK_CLIENT_SECRET=<Your Facebook Client Secret>
     GITHUB_CLIENT_ID=<Your GitHub Client ID>
     GITHUB_CLIENT_SECRET=<Your GitHub Client Secret>
     SESSION_SECRET_KEY=<Your session secret>

  Make sure to replace the placeholders with your actual credentials:
  - MongoDB connection string: The URI to your MongoDB database .
  - Google/Facebook/GitHub Client ID and Secret: You need to obtain these from their respective developer consoles.

4. **Run the project:**
   Start both the client and server:
   ```bash
      # In the server directory
      npm run start
      # In the client directory
      npm run dev
      h + enter
      o + enter

## Technical aspect

   - **How React Organizes Projects:** I learned how React organizes projects by dividing them into many components, making the codebase modular and easier to manage.

   - **Simplifying Code with Material-UI:** The Material-UI library significantly simplifies coding by providing a wide range of pre-built components that can be easily customized to fit the application's needs.

   - **State Management with React Hooks:** I gained experience managing the state of components using React hooks such as useState, useEffect, useContext, and others.
     
   - **Using Passport with different strategies :** such as Local (which relies on user credentials), and third-party OAuth strategies (Google, Facebook, and GitHub), allows you to provide authentication through multiple methods, giving users flexibility in how they log in.
     
   - Validate input on the client side before making a request using the react-hook-form library.








