import { DataTypes } from "sequelize";
import sequelize from "../../db/config.js";
import Customer from "../customer/index.js"; // Adjust path as needed

const SalesModel = sequelize.define(
    "Sales",
    {
        totalAmount: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
    },
    {}
);

export default SalesModel;
