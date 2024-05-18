const path = require('node:path');
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

const errorController = require('./controllers/errorController');
const AppError = require('./utils/AppError');
const boardRouter = require('./routes/boardRoutes');
const taskRouter = require('./routes/taskRoutes');

app.set('json spaces', 2);

app.get('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, 'index.html'));
});

app.use(express.json());
app.use(cookieParser());

app.use('/api/v1/boards', boardRouter);

app.all('*', (req, res) => {
  throw new AppError(
    `The resource requested (${req.originalUrl}) doesn't exist.`,
    404
  );
});

app.use(errorController);

module.exports = app;
