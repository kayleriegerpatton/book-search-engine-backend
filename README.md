# Book Search-Back-End

![MIT](https://img.shields.io/static/v1?label=MIT&message=License&color=blueviolet)

## Table of Contents

- [Description](#description)
  - [Technologies](#technologies)
  - [Deployed Application](#deployed-application)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Database Configuration](#database-configuration)
  - [Run the Application](#run-the-application)
- [License](#license)
- [Screenshots](#screenshots)

## Description

A book search application powered by the Google Books API. Users can search books and then save to and delete from their accounts.

The application implements a React.js front-end and an Apollo server making GraphQL queries and mutations to interact with the MongoDB database.

### Technologies

- Apollo Client
- Apollo Server
- MongoDB
- Mongoose
- GraphQL
- React

### Deployed Application

This application is currently deployed on Heroku. [View the deployed application](https://thawing-cliffs-42043.herokuapp.com/)

## Getting Started

### Installation

```
git clone https://github.com/kayleriegerpatton/book-search-engine-backend.git
cd book-search-engine-backend
npm install
```

To run the app, you will also need to install the front-end files from the [book-search-engine-frontend](https://github.com/kayleriegerpatton/book-search-engine-frontend) repo:

```
git clone https://github.com/kayleriegerpatton/book-search-engine-frontend.git
cd book-search-engine-frontend
npm install
```

### Database Configuration

Set up a .env file, using the .env_EXAMPLE provided, including a database name and secret.

```
DB_NAME=
SECRET=
```

### Run the Application

Start the server and run the front-end application in their respective terminals:

```
npm run start
```

## License

MIT License

## Screenshots

Search Results
![Search Results](public/assets/images/search-view-screenshot.png)

Account Books View
![Account Books View](public/assets/images/books-view-screenshot.png)
