const express = require('express');
const router = express.Router();

const parentFunc = require('../controllers/parent');

router
  .post('/',   parentFunc.create)
  .get('/',    parentFunc.getAll)
  .get('/:id', parentFunc.getById)
  .put('/:id', parentFunc.updateTeacher);

module.exports = router;
