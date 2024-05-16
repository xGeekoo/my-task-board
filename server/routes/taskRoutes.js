const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

router.route('/').post(taskController.createTask);
router.route('/:userId').get(taskController.getAllTasks);
router
  .route('/:id')
  .patch(taskController.updateTask)
  .delete(taskController.deleteTask);

module.exports = router;
