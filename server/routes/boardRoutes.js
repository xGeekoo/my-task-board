const express = require('express');
const { createBoard } = require('../controllers/boardController');
const router = express.Router();

router.route('/').post(createBoard);
router.route('/:id').get().patch().delete();

module.exports = router;
