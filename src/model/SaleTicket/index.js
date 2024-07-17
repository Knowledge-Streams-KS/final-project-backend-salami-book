import { DataTypes } from "sequelize";
import sequelize from "../../db/config.js";
import SalesModel from "../Sales/index.js";

const SaleTicket = sequelize.define("SaleTicket", {
   
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    
});

SalesModel.hasMany(SaleTicket);
SaleTicket.belongsTo(SalesModel);


export default SaleTicket;
