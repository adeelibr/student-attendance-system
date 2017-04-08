const bcrypt = require('bcrypt-nodejs');
const validator = require('validator');

const models = require('../models');
const Parents = models.parents;

module.exports = {

    create: function (req, res, next) {
        const validateResult = validateParentBody(req.body);
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

        Parents.create(req.body)
        .then((data) => {
            if (!data) {
                res.status(400).send({ 
                    success: false, message: 'Parent was not created.' 
                });
            } else if (data) {
                return res.status(200).json({ 
                    success: true, message: 'Succesfully created account', parent: data 
                }).end();
            }
        })
        .catch((err) => {
			return res.status(500).json({ success: false, message: "Internal Server Error" }).end();
		});
    },

    getAll: function (req, res, next) {
        Parents.findAll({})
		.then((parents) => {
			if(parents === null) {
				return res.status(400).json({ success: false, message: "No Parent(s) Exist" }).end();
			}
			return res.status(200).json({ success: true, parents }).end();
		});
    },

    getById: function (req, res, next) {
        var id = req.params.id;
		if (!id) {
			return res.status(400).json({ success: false, message: "Parameter is missing" }).end();
		}

		Parents.findOne({
			where: { id : id }
		})
		.then((parent) => {
			if(parent === null) {
				return res.status(400).json({ success: false, message: "No parent Found" }).end();
			}
			return res.status(200).json({ success: true, parent }).end();
		})
		.catch(function(err) {
			console.log(err);
			return res.status(500).json({ success: false, message: "Internal Server Error" }).end();
		})
    },

    updateTeacher: function (req, res, next) {
        const validateResult = validateParentBody(req.body);
        if (!validateResult.success) {
        return res.status(400).json({
            success: false,
            message: validateResult.message,
            errors: validateResult.errors
        }).end();
        }

        let parent = req.body;
		let id = req.params.id;

		Parents.update(parent, { where: { id: id } })
		.then((data) => {
			return Parents.findOne({ where: { id : id } });
		})
		.then((data) => {
			return res.status(200).json({ success: true, message: 'Succesfully updated account', parent: data }).end();
		})
		.catch((error) => {
			console.log(err);
			return res.status(500).json({ success: false, message: "Internal Server Error" }).end();
		})
    },

};

function validateParentBody(payload) {
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
  if (!payload || typeof payload.email !== 'string' || !validator.isEmail(payload.email)) {
    isFormValid = false;
    errors.email = 'Please provide a valid email';
  }
  if (!payload || typeof payload.contact_no !== 'number') {
    isFormValid = false;
    errors.contact_no = 'Please provide a valid contact number';
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

  if (!isFormValid) {
    message = 'Check the form for errors';
  }

  return {
    success: isFormValid,
    message,
    errors
  }
}
