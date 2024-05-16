const path = require('node:path');
const express = require('express');
const app = express();

const errorController = require('./controllers/errorController');
const AppError = require('./utils/AppError');
const taskRouter = require('./routes/taskRoutes');

app.set('json spaces', 2);

app.get('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, 'index.html'));
});

app.use('/api/v1/tasks', taskRouter);

app.all('*', (req, res) => {
  throw new AppError(
    `The resource requested (${req.originalUrl}) doesn't exist.`,
    404
  );
});

app.use(errorController);

module.exports = app;
