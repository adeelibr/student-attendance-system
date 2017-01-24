const express = require('express');
const router = express.Router();

// Get our API routes
const student = require('./student');

// Set our api/student routes
router.use('/student', student);

module.exports = router;
