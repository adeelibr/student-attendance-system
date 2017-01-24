var models = require('../models');
var Students = models.students;

module.exports = {

  create: function (req, res, next) {
    const validateResult = validateStudentBody(req.body);
    if (!validateResult.success) {
      return res.status(500).json({
        success: false,
        message: validateResult.message,
        errors: validateResult.errors
      }).end();
    }
  },

};

function validateStudentBody(payload) {
  const errors = {};
  let isFormValid = true;
  let message = '';

  if (!payload || typeof payload.username !== 'string' || payload.username.trim().length === 0) {
    isFormValid = false;
    errors.username = 'Please provide your Username';
  }

  if (!payload || typeof payload.first_name !== 'string' || payload.first_name.trim().length === 0) {
    isFormValid = false;
    errors.first_name = 'Please provide your First Name';
  }

  if (!payload || typeof payload.last_name !== 'string' || payload.last_name.trim().length === 0) {
    isFormValid = false;
    errors.last_name = 'Please provide your Last Name';
  }

  if (!payload || typeof payload.email !== 'string' || !validator.isEmail(payload.email) ) {
    isFormValid = false;
    errors.email = 'Please provide your Email';
  }

  if (!payload || typeof payload.password !== 'string' || payload.password.trim().length === 0) {
    isFormValid = false;
    errors.password = 'Please provide your Password';
  }

  if (!payload || typeof payload.confirmPassword !== 'string' || payload.password.trim().length === 0 || !validator.equals(payload.password, payload.confirmPassword)) {
    isFormValid = false;
    errors.confirmPassword = 'Password & Confirm Password Do Not Match';
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
