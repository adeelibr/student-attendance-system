'use strict';
module.exports = function(sequelize, DataTypes) {
  var classes = sequelize.define('classes', {
    class_no: DataTypes.INTEGER,
    class_assign: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return classes;
};