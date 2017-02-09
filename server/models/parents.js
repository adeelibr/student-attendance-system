'use strict';
module.exports = function(sequelize, DataTypes) {
  var parents = sequelize.define('parents', {
    fname: DataTypes.STRING,
    lname: DataTypes.STRING,
    contact_no: DataTypes.STRING,
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    location_id: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return parents;
};