const validator = require('validator');

const models = require('../models');
const Classes = models.classes;

module.exports = {

  create: function (req, res, next) {
    const validateResult = validateClassBody(req.body);
    if (!validateResult.success) {
      return res.status(400).json({
        success: false,
        message: validateResult.message,
        errors: validateResult.errors
      }).end();
    }

    Classes.create(req.body)
    .then((data) => {
      if (!data) {
        res.status(400).send({ 
          success: false, message: 'Class was not created.' 
        });
      } else if (data) {
        return res.status(200).json({ 
          success: true, message: 'Succesfully created classes', class: data 
        }).end();
      }
    })
    .catch((err) => {
        return res.status(500).json({ success: false, message: "Internal Server Error" }).end();
    });

  },

  getAll: function (req, res, next) {
    Classes.findAll({})
    .then((classes) => {
        if(classes === null) {
            return res.status(400).json({ success: false, message: "No Classes(s) Exist" }).end();
        }
        return res.status(200).json({ success: true, classes }).end();
    });
  },

  getById: function (req, res, next) {
    var id = req.params.id;
    if (!id) {
        return res.status(400).json({ success: false, message: "Parameter is missing" }).end();
    }

    Classes.findOne({
        where: { id : id }
    })
    .then((classes) => {
        if(classes === null) {
            return res.status(400).json({ success: false, message: "No classes Found" }).end();
        }
        return res.status(200).json({ success: true, classes }).end();
    })
    .catch(function(err) {
        console.log(err);
        return res.status(500).json({ success: false, message: "Internal Server Error" }).end();
    })
  },

  updateClass: function (req, res, next) {
    const validateResult = validateClassBody(req.body);
    if (!validateResult.success) {
      return res.status(400).json({
        success: false,
        message: validateResult.message,
        errors: validateResult.errors
      }).end();
    }

    let myClass = req.body;
    let id = req.params.id;

    Classes.update(myClass, { where: { id: id } })
    .then((data) => {
        return Classes.findOne({ where: { id : id } });
    })
    .then((data) => {
        return res.status(200).json({ 
            success: true, message: 'Succesfully updated class', class: data 
        }).end();
    })
    .catch((error) => {
        console.log(err);
        return res.status(500).json({ success: false, message: "Internal Server Error" }).end();
    })
  },

};

function validateClassBody(payload) {
  const errors = {};
  let isFormValid = true;
  let message = '';

  if (!payload || typeof payload.class_no !== 'string' || payload.class_no.trim().length === 0) {
    isFormValid = false;
    errors.class_no = 'Please provide your class number';
  }
  if (!payload || typeof payload.class_assign !== 'string' || payload.class_assign.trim().length === 0) {
    isFormValid = false;
    errors.class_assign = 'Please provide your class assign';
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