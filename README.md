# AI Interview Simulator

AI Interview Simulator is a full-stack application that helps users practice technical interview scenarios, save responses, and receive AI-driven feedback and weak-area analysis.

The project includes:
- A React + Vite frontend with polished UI and role selection.
- An Express backend with MongoDB persistence.
- OpenAI + LangChain integration for dynamic question generation, performance feedback, and diagnostic weak-area analysis.

## Purpose

The app is designed to help job seekers prepare for interviews by:
- Generating tailored interview questions for selected job roles and experience levels.
- Saving completed interview sessions for later review.
- Providing AI feedback on submitted answers.
- Identifying technical gaps and recommended improvement actions.
- Offering a dashboard experience with interview records and analytics.

## Key Features

- User sign up and login
- Role-based interview simulation
- Custom experience level and session length selection
- AI-generated interview questions using LangChain and OpenAI
- Save interview responses to MongoDB
- View historical interview records
- Weak area diagnostics and feedback analysis
- Profile data viewing/updating

## Project Structure

- `/client` - React frontend app
- `/server` - Express backend API
- `/server/config/db.js` - MongoDB connection helper
- `/server/controllers` - Authentication and interview controllers
- `/server/models` - Mongoose data models
- `/server/langchain` - AI prompt modules for questions, feedback, and weak-area analysis
- `/server/routes` - API route definitions

## Tech Stack

- Frontend: React, Vite, Tailwind CSS, Framer Motion, GSAP
- Backend: Node.js, Express, MongoDB, Mongoose
- AI: OpenAI via LangChain
- Auth: JWT + bcrypt
- Utilities: Axios, CORS, Helmet, Morgan

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/malikimran-khan/ai-interview-simulator.git
cd ai-interview-simulator
```

### 2. Configure the backend

```bash
cd server
npm install
```

Create a `.env` file in the `server` folder with the following variables:

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/ai-interview-simulator?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret_here
OPENAI_API_KEY=your_openai_api_key_here
```

### 3. Configure the frontend

```bash
cd ../client
npm install
```

Create a `.env` file in the `client` folder if you need to override the default API URL in production:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

> The frontend automatically uses `http://localhost:5000/api` in development.

### 4. Run the backend server

From the `/server` folder:

```bash
node server.js
```

If you want live reload while developing, you can also run:

```bash
npx nodemon server.js
```

### 5. Run the frontend app

From the `/client` folder:

```bash
npm run dev
```

### 6. Open the app

Browse to the local Vite URL shown in the terminal, typically:

```bash
http://localhost:5173
```

## Development Notes

- The backend exposes authentication routes under `/api/auth`
- Interview APIs are available under `/api/interview`
- The frontend stores the user token and user ID in `localStorage`
- Interview session initialization data is stored temporarily in `localStorage` under `interviewData`
- The backend uses `OPENAI_API_KEY` for all LangChain requests

## API Endpoints

### Auth
- `POST /api/auth/signup` - create a new user
- `POST /api/auth/login` - authenticate and get a JWT token
- `GET /api/auth/profile/:id` - get user profile
- `PUT /api/auth/profile/:id` - update user profile

### Interview
- `POST /api/interview/start` - generate questions for a simulation
- `POST /api/interview/save` - save completed interview responses
- `GET /api/interview/:userId` - fetch saved interview records
- `POST /api/interview/feedback` - get AI feedback on answers
- `POST /api/interview/weak-areas` - get weak-area diagnostics

## Environment Variables Summary

### Server `/server/.env`

- `PORT` - server port (default: `5000`)
- `MONGO_URI` - MongoDB connection string
- `JWT_SECRET` - secret key for signing JWT tokens
- `OPENAI_API_KEY` - OpenAI API key for LangChain requests

### Client `/client/.env`

- `VITE_API_BASE_URL` - optional override for the API base URL in production

## Recommended Workflow

1. Start the backend server first.
2. Start the frontend app next.
3. Sign up or login in the app.
4. Select a job role and experience level.
5. Answer generated AI questions and save the session.
6. Review your interview records, feedback, and weak areas in the dashboard.

## Troubleshooting

- If OpenAI requests fail, verify `OPENAI_API_KEY` in `/server/.env`
- If MongoDB fails to connect, verify `MONGO_URI`
- If the frontend cannot reach the backend, set `VITE_API_BASE_URL` or confirm both servers are running

## License

This repository does not currently specify a license.
