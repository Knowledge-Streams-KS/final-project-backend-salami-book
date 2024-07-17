import { DataTypes } from "sequelize";
import sequelize from "../../db/config.js";
import SaleTicket from "../SaleTicket/index.js";

const Ticket = sequelize.define("Ticket", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },

    stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
});
Ticket.hasMany(SaleTicket);
SaleTicket.belongsTo(Ticket);

export default Ticket;
