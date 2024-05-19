const express = require('express');
const router = express.Router();
const {
  createBoard,
  getBoard,
  updateBoard
} = require('../controllers/boardController');
const taskRouter = require('./taskRoutes');

router.use('/:boardId/tasks', taskRouter);

router.route('/').post(createBoard);
router.route('/:id').get(getBoard).patch(updateBoard);

module.exports = router;
