# WTWR Backend API

This project is the backend for the WTWR application. It provides authentication, user profile management, and clothing item CRUD/likes APIs, backed by MongoDB and secured with JWT.

## Project Walkthrough

A full video walkthrough of the project architecture, deployment process, and key implementation details is available here:

[Watch the Project Walkthrough on Loom](https://www.loom.com/share/f5e75b4e7ca44b45b31ffc16aa0fbfdc)

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
- Frontend GitHub Repo: https://github.com/Ewell19/se_project_react_fixed

## Scripts

- `npm run start` — starts the server on `localhost:3001`
- `npm run dev` — starts the server with hot reload on `localhost:3001`
- `npm run lint` — runs ESLint
