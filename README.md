# 12MegaBlog

A full-stack blog application built with React, Node.js, Express, and MongoDB.

## Features

- User authentication (register/login)
- Create, read, update, delete posts
- Rich text content editor
- Image upload support
- Responsive design with Tailwind CSS

## Tech Stack

- **Frontend**: React, Vite, Tailwind CSS, Redux
- **Backend**: Node.js, Express
- **Database**: MongoDB (Mongoose)
- **Authentication**: JWT tokens

## Getting Started

### Prerequisites

- Node.js (v14+)
- MongoDB

### Installation

1. Install frontend dependencies:
```bash
npm install
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

### Running the App

1. Start MongoDB:
```bash
mongod
```

2. Start backend server:
```bash
cd backend
node server.js
```
Server runs on http://localhost:5000

3. Start frontend:
```bash
npm run dev
```
Frontend runs on http://localhost:5173

## Project Structure

```
12MegaBlog/
├── src/                 # React frontend
│   ├── api/            # API calls
│   ├── components/     # UI components
│   ├── pages/          # Page components
│   ├── store/         # Redux store
│   └── firebase/      # Service layer
├── backend/            # Express backend
│   ├── server.js      # Main server file
│   └── uploads/       # Uploaded images
└── public/             # Static assets
```

## API Endpoints

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `GET /api/posts` - Get all posts
- `GET /api/posts/:id` - Get single post
- `POST /api/posts` - Create post
- `PUT /api/posts/:id` - Update post
- `DELETE /api/posts/:id` - Delete post
