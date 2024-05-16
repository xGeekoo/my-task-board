const Task = require('../models/taskModel');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

exports.getAllTasks = catchAsync(async (req, res) => {
  const tasks = await Task.find({ userId: req.userId });
  res.status(200).json({ status: 'success', data: { tasks } });
});

exports.createTask = catchAsync(async (req, res) => {
  const tasks = await Task.create({
    ...req.body,
    _id: undefined,
    userId: req.userId
  });
  res.status(201).json({ status: 'success', data: { tasks } });
});

exports.updateTask = catchAsync(async (req, res) => {
  const task = await Task.findByIdAndUpdate(
    req.params.id,
    { ...req.body, _id: undefined, userId: undefined },
    { runValidators: true, new: true }
  );
  if (!task) throw new AppError("The task doesn't exist.", 404);
  res.status(200).json({ status: 'success', data: { task } });
});

exports.deleteTask = catchAsync(async (req, res) => {
  const task = await Task.findByIdAndDelete(req.params.id);
  if (!task) throw new AppError("The task doesn't exist.", 404);
  res.status(204).json({ status: 'success', data: null });
});
