const bcrypt = require('bcrypt-nodejs');
const validator = require('validator');

const models = require('../models');
const Teachers = models.teachers;

module.exports = {

    create: function(req, res, next) {
        const validateResult = validateTeacherBody(req.body);
        if (!validateResult.success) {
            return res.status(400).json({
                success: false,
                message: validateResult.message,
                errors: validateResult.errors
            }).end();
        }
        
        // hash password
        let payload = req.body;
        payload.password = bcrypt.hashSync(payload.password);

        Teachers.create(payload)
        .then((data) => {
            if (!data) {
                res.status(400).send({ 
                    success: false, message: 'Teacher was not created.' 
                });
            } else if (data) {
                return res.status(200).json({ 
                    success: true, message: 'Succesfully created account', teacher: data 
                }).end();
            }
        })
        .catch((err) => {
			    return res.status(500).json({ success: false, message: "Internal Server Error" }).end();
		    });
    },

    getAll: function(req, res, next) {
      Teachers.findAll({})
      .then((teachers) => {
        if(teachers === null) {
          return res.status(400).json({ success: false, message: "No Teachers(s) Exist" }).end();
        }
        return res.status(200).json({ success: true, teachers }).end();
      });
    },

    getById: function (req, res, next) {
      var id = req.params.id;
      if (!id) {
        return res.status(400).json({ success: false, message: "Parameter is missing" }).end();
      }

      Teachers.findOne({
        where: { id : id }
      })
      .then((teacher) => {
        if(teacher === null) {
          return res.status(400).json({ success: false, message: "No teacher Found" }).end();
        }
        return res.status(200).json({ success: true, teacher }).end();
      })
      .catch(function(err) {
        console.log(err);
        return res.status(500).json({ success: false, message: "Internal Server Error" }).end();
      })
    },

    updateTeacher: function (req, res, next) {
      const validateResult = validateTeacherBody(req.body);
      if (!validateResult.success) {
      return res.status(400).json({
          success: false,
          message: validateResult.message,
          errors: validateResult.errors
      }).end();
      }

      let teacher = req.body;
      let id = req.params.id;

      Teachers.update(teacher, { where: { id: id } })
      .then((data) => {
        return Teachers.findOne({ where: { id : id } });
      })
      .then((data) => {
        return res.status(200).json({ 
                  success: true, message: 'Succesfully updated account', teacher: data 
              }).end();
      })
      .catch((error) => {
        console.log(err);
        return res.status(500).json({ success: false, message: "Internal Server Error" }).end();
      })
    },
};

function validateTeacherBody(payload) {
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
  if (!payload || typeof payload.cnic !== 'string' || payload.cnic.trim().length === 0) {
    isFormValid = false;
    errors.cnic = 'Please provide your CNIC';
  }
  if (!payload || typeof payload.email !== 'string' || !validator.isEmail(payload.email)) {
    isFormValid = false;
    errors.email = 'Please provide a valid email';
  }
  if (!payload || typeof payload.profile_picture !== 'string' || payload.profile_picture.trim().length === 0) {
    isFormValid = false;
    errors.profile_picture = 'Please provide your Picture';
  }
  if (!payload || typeof payload.username !== 'string' || payload.username.trim().length === 0) {
    isFormValid = false;
    errors.username = 'Please provide your username';
  }
  if (!payload || typeof payload.password !== 'string' || payload.password.trim().length === 0) {
    isFormValid = false;
    errors.password = 'Please provide your password';
  }
  if (!payload || typeof payload.location_id !== 'number') {
    isFormValid = false;
    errors.location_id = 'Please provide your location id';
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
