const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
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
    required: [true, 'Please provide an icon.']
  },
  status: {
    type: String,
    enum: {
      values: ['in-progress', 'completed', 'wont-do'],
      message: 'Please provide a valid status.'
    }
  }
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
