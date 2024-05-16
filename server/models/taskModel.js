const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  userId: {
    type: String,
    trim: true,
    required: [true, 'Please provide a user id.']
  },
  name: {
    type: String,
    trim: true,
    required: [true, 'Please provide a task name.']
  },
  description: {
    type: String,
    trim: true
  },
  icon: {
    type: String,
    enum: {
      values: ['👨‍💻', '💬', '☕', '🏋️', '📚', '⏰'],
      message: 'Please provide a valid icon.'
    },
    required: [true, 'Please provide a valid icon.']
  },
  status: {
    type: String,
    enum: {
      values: ['in-progress', 'completed', 'wont-do'],
      message: 'Please provide a valid status.'
    },
    required: [true, 'Please provide a status.']
  }
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
