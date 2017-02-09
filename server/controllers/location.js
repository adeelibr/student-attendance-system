const validator = require('validator');

const models = require('../models');
const Locations = models.locations;

module.exports = {

  create: function (req, res, next) {
    const validateResult = validateLocationBody(req.body);
    if (!validateResult.success) {
      return res.status(400).json({
        success: false,
        message: validateResult.message,
        errors: validateResult.errors
      }).end();
    }

    Locations.create(req.body)
    .then((data) => {
      if (!data) {
        res.status(400).send({ 
          success: false, message: 'Location was not created.' 
        });
			} else if (data) {
        return res.status(200).json({ 
          success: true, message: 'Succesfully created location', location: data 
        }).end();
      }
    })
    .catch((err) => {
        return res.status(500).json({ success: false, message: "Internal Server Error" }).end();
    });

  },

  getAll: function (req, res, next) {
    Locations.findAll({})
		.then((locations) => {
			if(locations === null) {
				return res.status(400).json({ success: false, message: "No Location(s) Exist" }).end();
			}
			return res.status(200).json({ success: true, locations }).end();
		});
  },

  getById: function (req, res, next) {
    var id = req.params.id;
    if (!id) {
        return res.status(400).json({ success: false, message: "Parameter is missing" }).end();
    }

    Locations.findOne({
        where: { id : id }
    })
    .then((location) => {
        if(location === null) {
            return res.status(400).json({ success: false, message: "No location Found" }).end();
        }
        return res.status(200).json({ success: true, location }).end();
    })
    .catch(function(err) {
        console.log(err);
        return res.status(500).json({ success: false, message: "Internal Server Error" }).end();
    })
  },

  updateLocation: function (req, res, next) {
    const validateResult = validateLocationBody(req.body);
    if (!validateResult.success) {
      return res.status(400).json({
        success: false,
        message: validateResult.message,
        errors: validateResult.errors
      }).end();
    }

    let location = req.body;
    let id = req.params.id;

    Locations.update(location, { where: { id: id } })
    .then((data) => {
        return Locations.findOne({ where: { id : id } });
    })
    .then((data) => {
        return res.status(200).json({ 
            success: true, message: 'Succesfully updated location', location: data 
        }).end();
    })
    .catch((error) => {
        console.log(err);
        return res.status(500).json({ success: false, message: "Internal Server Error" }).end();
    })
  },

};

function validateLocationBody(payload) {
  const errors = {};
  let isFormValid = true;
  let message = '';

  if (!payload || typeof payload.address !== 'string' || payload.address.trim().length === 0) {
    isFormValid = false;
    errors.address = 'Please provide your address';
  }
  if (!payload || typeof payload.city !== 'string' || payload.city.trim().length === 0) {
    isFormValid = false;
    errors.city = 'Please provide your city';
  }
  if (!payload || typeof payload.country !== 'string' || payload.country.trim().length === 0) {
    isFormValid = false;
    errors.country = 'Please provide your country';
  }
  if (!payload || typeof payload.postal_code !== 'string' || payload.postal_code.trim().length === 0) {
    isFormValid = false;
    errors.postal_code = 'Please provide your postal code';
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