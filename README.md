# WTWR Backend API

This project is the backend for the WTWR application. It provides authentication, user profile management, and clothing item CRUD/likes APIs, backed by MongoDB and secured with JWT.

## Functionality

- User registration and login (`/signup`, `/signin`)
- Protected user profile endpoints (`/users/me`)
- Public and protected clothing item endpoints (`/items`, likes, delete)
- Input validation with Celebrate/Joi
- Centralized error handling with custom error classes
- Request and error logging to files
- Crash-test endpoint for PM2 recovery checks (`/crash-test`)

## Technologies

- Node.js, Express
- MongoDB, Mongoose
- JWT (`jsonwebtoken`)
- Celebrate/Joi for request validation
- Winston + express-winston for logging
- ESLint (airbnb-base) + Prettier

## Deployment

- Frontend: https://wtwr.barabesta.is
- Frontend (www): https://www.wtwr.barabesta.is
- Backend API: https://api.wtwr.barabesta.is

## Scripts

- `npm run start` — starts the server on `localhost:3001`
- `npm run dev` — starts the server with hot reload on `localhost:3001`
- `npm run lint` — runs ESLint
