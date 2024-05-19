const path = require('node:path');
const express = require('express');
const cookieParser = require('cookie-parser');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const app = express();

const errorController = require('./controllers/errorController');
const AppError = require('./utils/AppError');
const boardRouter = require('./routes/boardRoutes');

app.set('json spaces', 2);

/* app.use((req, res, next) => {
  // Simulate network delay
  setTimeout(next, 500);
}); */

app.use(helmet());

app.get('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, 'index.html'));
});
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(cookieParser());
app.use(mongoSanitize());

app.use('/api/v1/boards', boardRouter);

app.all('*', (req, res) => {
  throw new AppError(
    `The resource requested (${req.originalUrl}) doesn't exist.`,
    404
  );
});

app.use(errorController);

module.exports = app;
