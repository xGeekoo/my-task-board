const express = require('express');
const router = express.Router();
const { createTask, getAllTasks } = require('../controllers/taskController');
const getUserId = require('../middlewares/getUserId');

router.route('/').post(getUserId, createTask);
router.route('/:userId').get(getAllTasks);

module.exports = router;
