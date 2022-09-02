const express = require('express');
const login = require('./controllers/login');
const user = require('./controllers/user');
const allUser = require('./controllers/allUsers');
const userById = require('./controllers/userById');
// const { verifyToken } = require('./validation/authorizationValidation');
// ...

const app = express();

app.use(express.json());

// ...
app.use('/login', login);
app.use('/user', user);
// app.use(verifyToken);
app.use('/user', allUser);
app.use('/:id', userById);

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
