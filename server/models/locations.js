'use strict';
module.exports = function(sequelize, DataTypes) {
  var locations = sequelize.define('locations', {
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    country: DataTypes.STRING,
    postal_code: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return locations;
};