const express = require('express');
const router = express.Router();

// Get our API routes
const auth  = require('./auth');
const student  = require('./student');
const teacher  = require('./teacher');
const parent   = require('./parent' );
const location = require('./location');
const classRoute = require('./class');
const adminRoute = require('./admin');

router
    .use('/auth', auth)
    .use('/student', student)
    .use('/teacher', teacher)
    .use('/parent', parent)
    .use('/location', location)
    .use('/class', classRoute)
    .use('/admin', adminRoute);

module.exports = router;
