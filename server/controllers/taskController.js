const Board = require('../models/boardModel');
const Task = require('../models/taskModel');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

exports.createTask = catchAsync(async (req, res) => {
  const task = await Task.create({
    ...req.body,
    _id: undefined
  });

  await Board.updateOne(
    { _id: req.params.boardId },
    { $push: { tasks: task._id } },
    { runValidators: true }
  );

  res.status(201).json({ status: 'success', data: { task } });
});

exports.updateTask = catchAsync(async (req, res) => {
  const task = await Task.findByIdAndUpdate(
    req.params.id,
    { ...req.body, _id: undefined },
    { runValidators: true, new: true }
  );
  if (!task) throw new AppError("The task doesn't exist.", 404);
  res.status(200).json({ status: 'success', data: { task } });
});

exports.deleteTask = catchAsync(async (req, res) => {
  const task = await Task.findByIdAndDelete(req.params.id);
  if (!task) throw new AppError("The task doesn't exist.", 404);
  await Board.findByIdAndUpdate(
    req.params.boardId,
    { $pull: { tasks: task._id } },
    { runValidators: true, new: true }
  );
  res.status(204).json({ status: 'success', data: null });
});
