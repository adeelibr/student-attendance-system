const express = require('express');
const router = express.Router();

const adminFunc = require('../controllers/admin');

router
  .post('/',   adminFunc.create)
  .get('/',    adminFunc.getAll)
  .get('/:id', adminFunc.getById)
  .put('/:id', adminFunc.updateAdmin);

module.exports = router;
