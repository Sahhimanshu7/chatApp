<h1 align="center">
  chatApp
</h1>
<p align="center">
A MERN based web application that lets users to chat in an user friendly experience.
<p>

## Table of Contents:

1. [`Introduction`](#Introduction)

2. [`Getting Started`](#2-getting-started)

3. [`Prerequisites`](#3-prerequisites)

4. [`FrontEnd and BackEnd`](#4-frontend-and-backend)

5. [`Dependencies`](#5-dependencies)

6. [`Author`](#6-author)

# Usage

## 1. Introduction

chatApp, a MERN application, developed with the purpose to be able to talk to my friends and realtives without any organization using that conversation to show up ad on my feed. chatApp has a great potential if used publicly.

chatApp uses **socket.io** to facitilate real-time chat. It also uses sessions to avoid login continuously. It also uses firebase for user authentication and management.

## 2. Getting Started

### Clone or download the repository.

```Terminal
// Use '.', period at last to clone in the same repository
$ git clone git@github.com:Sahhimanshu7/chatApp.git
```

After clonning the repository, navigate to the folder 'chatApp'. It's the root folder of the project.

```
Folder Structure

client/
  package.json
  public/ // has index.html
  src/    // all the source files of the client side operation

server/
  config/
  controllers/
  middlewares/
  models/
  routes/
  index.js
  package.json

.gitignore
```

## 3. Prerequisites

**Notice,** before getting started with running the program, make sure you have following installed on your computer.

> [`MongoDB`](https://www.mongodb.com/)

> [`node`](https://nodejs.org/en)

> [`npm`](https://www.npmjs.com/)

## 4. FrontEnd and BackEnd

The project is divided into two parts : **FrontEnd** and **BackEnd**. They need to be run on different terminals to be able to communicate.

### FrontEnd

Preferably in a new terminal.

```
// Navigate into client and install node_modules
$ cd client
$ npm install
```

Before starting the project, you need to get a firebase config file from: https://firebase.google.com/docs/auth/web/start and paste it into the config folder in src with name "firebase.jsx".

```
// To start the application
$ npm start
```

### BackEnd

In another new terminal, type the following commands.

```
// Navigate into server and install node_modules
$ cd server
$ npm install
```

```
// To start the backend server
$ nodemon start
```

## 5. Dependencies

Following dependencies are used to support client and server sides of the application. Some of the dependencies might be outdated and not available at the time of your use.

**Please check their avaibility before using them.**

### Client Side :

`client/package.json`

```
"@heroicons/react": "^1.0.6",
"@testing-library/jest-dom": "^5.17.0",
"@testing-library/react": "^13.4.0",
"@testing-library/user-event": "^13.5.0",
"axios": "^1.6.7",
"emoji-picker-react": "^4.7.12",
"firebase": "^10.8.0",
"react": "^18.2.0",
"react-dom": "^18.2.0",
"react-router-dom": "^6.22.0",
"react-scripts": "5.0.1",
"socket.io-client": "^4.7.4",
"timeago-react": "^3.0.6",
"web-vitals": "^2.1.4"
```

### Server Side :

`server/package.json`

```
"cors": "^2.8.5",
"dotenv": "^16.4.1",
"express": "^4.18.2",
"firebase": "^10.8.0",
"firebase-admin": "^12.0.0",
"mongoose": "^8.1.1",
"nodemon": "^3.0.3",
"socket.io": "^4.7.4"
```

## 6. Author

[`Himanshu Sah`](https://github.com/Sahhimanshu7)

[`View my website`](https://www.sahhimanshu7.com)

For feedback or to get in touch
[`Email Me`](mailto:himanshusah41@gmail.com)
