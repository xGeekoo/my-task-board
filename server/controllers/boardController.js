const Board = require('../models/boardModel');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

exports.getBoard = catchAsync(async (req, res) => {
  const board = await Board.findById(req.params.id);
  if (!board) throw new AppError("The board doesn't exist", 404);
  res.status(200).json({ status: 'success', data: { board } });
});

exports.createBoard = catchAsync(async (req, res) => {
  // const DEFAULT_TASKS = [
  //   { name: 'Task in Progress', icon: '⏰', status: 'in-progress' },
  //   { name: 'Task Completed', icon: '🏋️', status: 'completed' },
  //   { name: "Task Won't Do", icon: '☕', status: 'wont-do' },
  //   { name: 'Task To Do', icon: '📚', status: 'created' }
  // ];

  const board = await Board.create();
  if (!board) throw new AppError("The board doesn't exist", 404);
  res.status(200).json({ status: 'success', data: { board } });
});
