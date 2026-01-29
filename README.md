# WTWR (What to Wear?): Back End

The back-end project is a complete Express API server for the WTWR application, including routes, controllers, models, authentication, and database connectivity. It demonstrates how to work with MongoDB, handle errors, secure routes with JWT, and run automated tests.

## Features

- RESTful API for managing users and clothing items
- MongoDB database integration with Mongoose ODM
- Input validation and error handling
- ESLint and Prettier for code quality
- Centralized HTTP status code constants

## Demo

Loom walkthrough: https://www.loom.com/share/ab8c01bce8f740d68def4a252c846bf3

## Backend Implementation

- Server entry point in `app.js`
- Routes in `routes/`
- Controllers in `controllers/`
- Mongoose models in `models/`
- Auth middleware in `middlewares/auth.js`
- Config and shared constants in `utils/`

## Technologies and Techniques

- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **ESLint** - Code linting with Airbnb style guide
- **Prettier** - Code formatting
- **Validator** - String validation library

## API Endpoints

### Users

- `GET /users` - Get all users
- `GET /users/:userId` - Get user by ID
- `POST /users` - Create a new user

### Clothing Items

- `GET /items` - Get all clothing items
- `POST /items` - Create a new clothing item
- `DELETE /items/:itemId` - Delete a clothing item by ID
- `PUT /items/:itemId/likes` - Like a clothing item
- `DELETE /items/:itemId/likes` - Unlike a clothing item

## Running the Project

`npm run start` — starts the API server (Express) on port 3001.

`npm run dev` — starts the server with hot reload (nodemon).

`npm run lint` — runs ESLint checks.

## Database Setup

Make sure MongoDB is running locally at `mongodb://127.0.0.1:27017/wtwr_db` before starting the server.

## Error Handling

The API returns consistent error responses with a single `message` field and the correct HTTP status code (400/401/403/404/409/500). Centralized error handling ensures the server never crashes on invalid requests.

## Project Structure

```
├── controllers/       # Route controllers
├── models/           # Mongoose schemas
├── routes/           # Express route definitions
├── utils/            # Utility files (error constants)
├── app.js            # Application entry point
├── package.json      # Project dependencies
└── README.md         # Project documentation
```

## Testing

Update `sprint.txt` to the current sprint number (13) before running CI checks.

## Author

Adam Ewell
