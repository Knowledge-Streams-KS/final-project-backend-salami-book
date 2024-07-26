import { DataTypes } from "sequelize";
import sequelize from "../../db/config.js";
import SalesModel from "../Sales/index.js";
import Customer from "../customer/index.js";

const SaleTicket = sequelize.define("SaleTicket", {

    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },

    CustomerId: { // Ensure this matches your column name in the database
        type: DataTypes.INTEGER,
        // allowNull: false,
        references: {
            model: Customer,
            key: 'id',
        },
    },
    
});

SalesModel.hasMany(SaleTicket);
SaleTicket.belongsTo(SalesModel);

Customer.hasMany(SaleTicket);
SaleTicket.belongsTo(Customer);


export default SaleTicket;
