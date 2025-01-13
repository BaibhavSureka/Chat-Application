# Chat Application

An end-to-end real-time chat application built with **React** for the front-end and **Node.js** with **Express** for the back-end. This application provides secure user authentication, real-time messaging, and efficient data management using **MongoDB Atlas**.

## Features

- **User Authentication**: Secure sign-up and login functionality using **bcryptjs** for password hashing and **jsonwebtoken** for managing sessions.
- **Real-Time Messaging**: Send and receive messages instantly using WebSockets.
- **Responsive UI**: Built with **React** for a smooth user experience across devices.
- **Data Security**: Sensitive information managed with **dotenv** for environment variables.

## Technologies Used

- **Frontend**: React.js, CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB Atlas
- **Authentication**: JSON Web Tokens (JWT), bcryptjs

## Setup & Installation

### 1. Clone the Repository

First, clone the repository to your local machine:

```bash
git clone https://github.com/yourusername/chat-application.git
cd chat-application
```

### 2. Install Dependencies

Install the required packages for both client and server:

```bash
# For server (backend)
cd server
npm install

# For client (frontend)
cd ../client
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the server directory and add the following:

```env
PORT=port_number
mongoDB_URI=your-mongo-db-uri
jwt_token=your-jwt-secret-key
```

### 4. Run the Application

**Backend**
To run the server locally:
```bash
node index.js
```

**Frontend**
To start the React app:
```bash
npm run dev
```

### 5. Test the API

Use Postman or any other API testing tool to test the backend routes.

## Dependencies

### Backend
- `mongoose`: MongoDB ORM for Node.js
- `express`: Web framework for Node.js
- `dotenv`: Load environment variables from .env file
- `bcryptjs`: Hashing passwords for secure storage
- `jsonwebtoken`: Token-based authentication

### Frontend
- `react`: JavaScript library for building user interfaces
- `react-router-dom`: React routing for handling different views
- `axios`: Promise-based HTTP client for making requests

## Applications Required

- MongoDB Atlas for hosting the database in the cloud
- Postman for testing API endpoints
- XAMPP Control Panel for local server management

## Future Enhancements

- Implement group chat functionality
- Add message read receipts and typing indicators
- Improve the UI/UX design with advanced features

## License

This project is open-source and available under the MIT License.
