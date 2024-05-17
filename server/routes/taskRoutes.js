const express = require('express');
const router = express.Router({ mergeParams: true });
const taskController = require('../controllers/taskController');

router.route('/').post(taskController.createTask);
router
  .route('/:id')
  .patch(taskController.updateTask)
  .delete(taskController.deleteTask);

module.exports = router;
