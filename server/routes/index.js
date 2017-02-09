const express = require('express');
const router = express.Router();

// Get our API routes
const student  = require('./student');
const teacher  = require('./teacher');
const parent   = require('./parent' );
const location = require('./location');
const classRoute = require('./class');

router
    .use('/student', student)
    .use('/teacher', teacher)
    .use('/parent', parent)
    .use('/location', location)
    .use('/class', classRoute);

module.exports = router;
