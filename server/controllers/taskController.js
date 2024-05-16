const Task = require('../models/taskModel');
const catchAsync = require('../utils/catchAsync');

exports.getTask = catchAsync(async (req, res) => {
  const tasks = await Task.find({ userId: req.userId });
  res.status(200).json({ status: 'success', data: { tasks } });
});

exports.createTask = catchAsync(async (req, res) => {
  const tasks = await Task.create({ ...req.body, userId: req.userId });
  console.log(tasks);
  res.status(200).json({ status: 'success', data: { tasks } });
});
