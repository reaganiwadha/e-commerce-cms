'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Product.init({
    name: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notEmpty : true
      }
    },
    image_url: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notEmpty : true
      }
    },
    price: {
      type : DataTypes.INTEGER,
      allowNull : false,
      validate : {
        notEmpty : true,
        min : 0,
      }
    },
    stock: {
      type : DataTypes.INTEGER,
      allowNull : false,
      validate : {
        notEmpty : true,
        min : 0
      }
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};