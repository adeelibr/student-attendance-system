const validator = require('validator');

var models = require('../models');
var Students = models.students;

module.exports = {

  create: function (req, res, next) {
    const validateResult = validateStudentBody(req.body);
    if (!validateResult.success) {
      return res.status(400).json({
        success: false,
        message: validateResult.message,
        errors: validateResult.errors
      }).end();
    }
  },

  get: function (req, res, next) {
    return res.status(200).json({
      success: true,
      message: 'All Users',
      data: [],
    });
  }

};

function validateStudentBody(payload) {
  const errors = {};
  let isFormValid = true;
  let message = '';

  if (!payload || typeof payload.fname !== 'string' || payload.fname.trim().length === 0) {
    isFormValid = false;
    errors.fname = 'Please provide your First Name';
  }
  if (!payload || typeof payload.lname !== 'string' || payload.lname.trim().length === 0) {
    isFormValid = false;
    errors.lname = 'Please provide your Last Name';
  }
  if (!payload || typeof payload.dob !== 'string' || !validator.isDate(payload.dob) ) {
    isFormValid = false;
    errors.dob = 'Please provide your Date Of Birth';
  }
  if (!payload || typeof payload.cnic !== 'string' || payload.cnic.trim().length === 0) {
    isFormValid = false;
    errors.cnic = 'Please provide your CNIC';
  }
  if (!payload || typeof payload.profile_picture !== 'string' || payload.profile_picture.trim().length === 0) {
    isFormValid = false;
    errors.profile_picture = 'Please provide your Picture';
  }
  if (!payload || typeof payload.email !== 'string' || !validator.isEmail(payload.email)) {
    isFormValid = false;
    errors.email = 'Please provide a valid email';
  }
  if (!payload || typeof payload.username !== 'string' || payload.username.trim().length === 0) {
    isFormValid = false;
    errors.username = 'Please provide your username';
  }
  if (!payload || typeof payload.password !== 'string' || payload.password.trim().length === 0) {
    isFormValid = false;
    errors.password = 'Please provide your password';
  }
  if (!payload || typeof payload.status !== 'boolean') {
    isFormValid = false;
    errors.status = 'Please provide your status';
  }
  if (!payload || typeof payload.teacher_id !== 'number') {
    isFormValid = false;
    errors.teacher_id = 'Please provide your teacher id';
  }
  if (!payload || typeof payload.location_id !== 'number') {
    isFormValid = false;
    errors.location_id = 'Please provide your location id';
  }
  if (!payload || typeof payload.parent_id !== 'number') {
    isFormValid = false;
    errors.parent_id = 'Please provide your parent id';
  }
  if (!payload || typeof payload.class_id !== 'number') {
    isFormValid = false;
    errors.class_id = 'Please provide your class id';
  }

  if (!isFormValid) {
    message = 'Check the form for errors';
  }

  return {
    success: isFormValid,
    message,
    errors
  }
}
