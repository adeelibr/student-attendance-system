const bcrypt = require('bcrypt-nodejs');
const validator = require('validator');

var models = require('../models');
var Students = models.students;
var Admins = models.admins;

module.exports = {

  create: function (req, res, next) {
    const validateResult = validateAdminBody(req.body);
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

    Admins.create(payload)
    .then((data) => {
      if (!data) {
				res.status(400).send({
          success: false, message: 'Admin was not created.'
        });
			} else if (data) {
        return res.status(200).json({
          success: true, message: 'Succesfully created account', admin: data
        }).end();
      }
    })
    .catch((error) => {
			return res.status(500).json({ success: false, message: "Internal Server Error", error }).end();
		});

  },

  getAll: function (req, res, next) {
    Admins.findAll({})
		.then((admins) => {
			if(admins === null) {
				return res.status(400).json({ success: false, message: "No Admin(s) Exist" }).end();
			}
			return res.status(200).json({ success: true, admins }).end();
		});
  },

  getById: function (req, res, next) {
    var id = req.params.id;
		if (!id) {
			return res.status(400).json({ success: false, message: "Parameter is missing" }).end();
		}

		Admins.findOne({ where: { id : id } })
		.then((admin) => {
			if(admin === null) {
				return res.status(400).json({ success: false, message: "No admin Found" }).end();
			}
			return res.status(200).json({ success: true, admin }).end();
		})
		.catch(function(err) {
			console.log(err);
			return res.status(500).json({ success: false, message: "Internal Server Error" }).end();
		})
  },

  updateAdmin: function (req, res, next) {
    const validateResult = validateAdminBody(req.body);
    if (!validateResult.success) {
      return res.status(400).json({
        success: false,
        message: validateResult.message,
        errors: validateResult.errors
      }).end();
    }

    let admin = req.body;
		let id = req.params.id;

		Admins.update(admin, { where: { id: id } })
		.then((data) => {
			return Admins.findOne({ where: { id : id } });
		})
		.then((data) => {
			return res.status(200).json({ success: true, message: 'Succesfully updated account', admin: data }).end();
		})
		.catch((error) => {
			console.log(error);
			return res.status(500).json({ success: false, message: "Internal Server Error" }).end();
		})
  },

};

function validateAdminBody(payload) {
  let errors = {};
  let isFormValid = true;
  let message = '';

  if (!payload || typeof payload.fname !== 'string' || payload.fname.trim().length === 0) {
    isFormValid = false;
    errors.fname = 'Please provide your first name';
  }
  if (!payload || typeof payload.lname !== 'string' || payload.lname.trim().length === 0) {
    isFormValid = false;
    errors.lname = 'Please provide your last name';
  }
  if (!payload || typeof payload.email !== 'string' || payload.email.trim().length === 0) {
    isFormValid = false;
    errors.email = 'Please provide your email name';
  }
  if (!payload || typeof payload.username !== 'string' || payload.username.trim().length === 0) {
    isFormValid = false;
    errors.username = 'Please provide your user name';
  }
  if (!payload || typeof payload.password !== 'string' || payload.password.trim().length === 0) {
    isFormValid = false;
    errors.password = 'Please provide your password name';
  }
  if (!payload || typeof payload.location_id !== 'number') {
    isFormValid = false;
    errors.location_id = 'Please provide location id';
  }

  if (!isFormValid) {
    message = 'Please check your form for errors';
  }

  return {
    success: isFormValid,
    message,
    errors
  }

}
