const express = require('express');
const router = express.Router();

const authFunc = require('../controllers/auth');

router
  .post('/admin',   authFunc.loginAdminUser)
  .post('/parent',   authFunc.loginParentUser)
  .post('/student',   authFunc.loginStudentUser)
  .post('/teacher',   authFunc.loginTeacherUser);

module.exports = router;