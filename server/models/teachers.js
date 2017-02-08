'use strict';
module.exports = function(sequelize, DataTypes) {
  var teachers = sequelize.define('teachers', {
    fname: DataTypes.STRING,
    lname: DataTypes.STRING,
    cnic: DataTypes.STRING,
    email: DataTypes.STRING,
    profile_picture: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    location_id: DataTypes.INTEGER,
    class_id: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return teachers;
};