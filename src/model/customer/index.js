import { DataTypes } from "sequelize";
import sequelize from "../../db/config.js";
import SaleTicket from "../SaleTicket/index.js";
import userModel from "../users/index.js"; // Adjust path as needed

const Customer = sequelize.define("Customer", {
    name: {
        type: DataTypes.STRING,
        allowNull: false, // Adjust as needed
    },
    address: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    contact: {
        type: DataTypes.STRING,
        allowNull: true,
    },
});

// Define the relationship
userModel.hasOne(Customer);
Customer.belongsTo(userModel);



export default Customer;
