const mongoose = require('mongoose');
const randomId = require('../utils/randomId');

// const Task = require('./taskModel');

// const taskSchema = Task.schema;

const boardSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: () => randomId()
  },
  name: {
    type: String,
    trim: true,
    required: [true, 'Please provide a board name']
  },
  description: {
    type: String,
    trim: true,
    required: [true, 'Please provide a description']
  },
  tasks: [mongoose.Schema.Types.ObjectId]
});

const Board = mongoose.model('Board', boardSchema);

module.exports = Board;
