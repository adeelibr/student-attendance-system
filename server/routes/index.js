const express = require('express');
const router = express.Router();

// Get our API routes
const student = require('./student');
const teacher = require('./teacher');

router
    .use('/student', student)
    .use('/teacher', teacher);

module.exports = router;
