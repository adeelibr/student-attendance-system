'use strict';
module.exports = function(sequelize, DataTypes) {
  var students = sequelize.define('students', {
    fname: DataTypes.STRING,
    lname: DataTypes.STRING,
    dob: DataTypes.DATE,
    cnic: DataTypes.STRING,
    profile_picture: DataTypes.STRING,
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    teacher_id: DataTypes.INTEGER,
    location_id: DataTypes.INTEGER,
    parent_id: DataTypes.INTEGER,
    class_id: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return students;
};