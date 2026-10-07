# 💬 MERN Chat App

A full-stack real-time chat application built using the **MERN Stack**.  
The application allows users to communicate through a modern web-based chat interface with a separate frontend and backend.

---

## 🚀 Features

- 🔐 User Authentication
- 👤 User Registration & Login
- 💬 Real-time Messaging
- 👥 User-to-User Chat
- 🟢 Online/Active User Support
- 📱 Responsive Chat Interface
- ⚡ Fast and Interactive UI
- 🔄 Real-time communication
- 🗄️ MongoDB database integration
- 🌐 REST API based backend

---

## 🛠️ Tech Stack

### Frontend

- React.js
- JavaScript
- HTML5
- CSS3
- Axios
- React Router

### Backend

- Node.js
- Express.js
- REST API

### Database

- MongoDB
- Mongoose

### Real-Time Communication

- Socket.IO

### Development Tools

- Git
- GitHub
- VS Code
- npm

---

## 📂 Project Structure

```text
mern-chat-app/
│
├── frontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── ...
│
├── server/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── package.json
│   └── ...
│
├── .gitignore
├── README.md
└── ...

⚙️ Prerequisites

Before running the project, make sure you have installed:

Node.js
npm
MongoDB
Git

Check your versions:

node --version
npm --version
git --version
🔧 Installation
1. Clone the Repository
git clone https://github.com/jaysuryawanshi65/mern-chat-app.git

Navigate into the project:

cd mern-chat-app
2. Install Backend Dependencies

Open a terminal:

cd server
npm install
3. Install Frontend Dependencies

Open another terminal:

cd frontend
npm install
🔐 Environment Variables

Create a .env file inside the server directory.

Example:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

Do not commit your .env file to GitHub.

The .gitignore file already excludes environment files.

▶️ Running the Application
Start Backend

Inside the server directory:

npm start

If the project uses a development script:

npm run dev

The backend will run on:

http://localhost:5000
Start Frontend

Open another terminal and navigate to:

cd frontend

Run:

npm start

The frontend will normally be available at:

http://localhost:3000
💬 How to Use
Start the backend server.
Start the React frontend.
Open the application in your browser.
Create a new account.
Login to the application.
Select another user.
Start a conversation.
Send and receive messages in real time.
🔄 Application Flow
User
 │
 ▼
React Frontend
 │
 ├── Authentication
 │
 ├── Chat Interface
 │
 └── Socket.IO
 │
 ▼
Node.js + Express Server
 │
 ├── REST APIs
 │
 ├── Authentication
 │
 └── Real-Time Communication
 │
 ▼
MongoDB
🧪 Testing

You can test real-time messaging by:

Opening the application in one browser window.
Login with one account.
Open another browser/incognito window.
Login with another account.
Start a conversation.
Send messages from both accounts.
Verify that messages are synchronized in real time.
📸 Screenshots

Add project screenshots here:

![Login Page](screenshots/login.png)

![Chat Page](screenshots/chat.png)

Recommended screenshots:

Login page
Registration page
User list
Chat interface
Real-time messaging
🔮 Future Improvements
📎 File and image sharing
🎤 Voice messages
🎥 Video calling
🔔 Push notifications
👥 Group chats
🟢 Advanced online/offline status
✏️ Message editing
🗑️ Message deletion
🌙 Dark mode
🔒 Improved security
📱 Mobile application
🔒 Security

The application should keep sensitive configuration values such as:

MongoDB credentials
JWT secrets
API keys

inside environment variables.

Never commit .env files or secret credentials to GitHub.

📚 Learning Outcomes

This project demonstrates practical experience with:

MERN Stack development
React.js
Node.js
Express.js
MongoDB
Mongoose
REST APIs
Authentication
Real-time communication
Socket.IO
Git & GitHub
Full-stack application architecture
👨‍💻 Author
Jay Suryavanshi

Full Stack Developer | Java | .NET | React | MERN

GitHub:
https://github.com/jaysuryawanshi65

⭐ Support

If you find this project useful, consider giving it a ⭐ on GitHub.
```
