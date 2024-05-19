const Board = require('../models/boardModel');
const Task = require('../models/taskModel');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');
const randomId = require('../utils/randomId');

exports.getBoard = catchAsync(async (req, res) => {
  const board = await Board.findById(req.params.id).populate('tasks');
  if (!board) throw new AppError("The board doesn't exist", 404);
  res.status(200).json({ status: 'success', data: { board } });
});

exports.createBoard = catchAsync(async (req, res) => {
  const DEFAULT_TASKS = [
    { name: 'Task in Progress', icon: '⏰', status: 'in-progress' },
    { name: 'Task Completed', icon: '🏋️', status: 'completed' },
    { name: "Task Won't Do", icon: '☕', status: 'wont-do' },
    {
      name: 'Task To Do',
      message: 'Work on a Challenge on devChallenges.io,\nlearn TypeScript.',
      icon: '📚',
      status: 'created'
    }
  ];

  const tasks = await Task.create(DEFAULT_TASKS);
  const tasksId = tasks.map(task => task._id);

  const board = await Board.create({
    _id: randomId(),
    name: 'My Task Board',
    description: 'Tasks to keep organised',
    tasks: tasksId
  });
  res.status(201).json({ status: 'success', data: { board } });
});

exports.updateBoard = catchAsync(async (req, res) => {
  const board = await Board.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { runValidators: true, new: true }
  );
  if (!board) throw new AppError("The board doesn't exist", 404);
  res.status(200).json({ status: 'success', data: { board } });
});
