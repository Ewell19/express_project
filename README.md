# WTWR (What to Wear?): Back End

The back-end project is focused on creating a server for the WTWR application. You'll gain a deeper understanding of how to work with databases, set up security and testing, and deploy web applications on a remote machine. The eventual goal is to create a server with an API and user authorization.

## Features

- RESTful API for managing users and clothing items
- MongoDB database integration with Mongoose ODM
- Input validation and error handling
- ESLint and Prettier for code quality
- Centralized HTTP status code constants

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

`npm run start` — to launch the server

`npm run dev` — to launch the server with the hot reload feature

`npm run lint` — to run ESLint checks

## Database Setup

Make sure MongoDB is running locally on `mongodb://127.0.0.1:27017/wtwr_db`

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

Before committing your code, make sure you edit the file `sprint.txt` in the root folder. The file `sprint.txt` should contain the number of the sprint you're currently working on. For ex. 12

## Author

Adam Ewell
