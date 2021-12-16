import uuidv4 from "uuid";
import { DataTypes } from "sequelize";

import sequelize from "../database/db.js";

const Product = sequelize.define("Product", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    // defaultValue: uuidv4(),
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.INTEGER,
  },
  image: {
    type: DataTypes.STRING,
  },
  rating: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },
});

export default Product;

// `sequelize.define` also returns the model
console.log(Product === sequelize.models.Product); // true
