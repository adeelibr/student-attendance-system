const express = require('express');
const router = express.Router();

const stdFunc = require('../controllers/student');

router
  .post('/',   stdFunc.create)
  .get('/',    stdFunc.getAll)
  .get('/:id', stdFunc.getById)
  .put('/:id', stdFunc.updateStudent);

module.exports = router;
