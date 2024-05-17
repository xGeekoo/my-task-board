const express = require('express');
const router = express.Router();
const { createBoard, getBoard } = require('../controllers/boardController');
const taskRouter = require('./taskRoutes');

router.use('/:boardId/tasks', taskRouter);

router.route('/').post(createBoard);
router.route('/:id').get(getBoard);

module.exports = router;
