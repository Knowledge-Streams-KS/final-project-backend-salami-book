import { DataTypes } from "sequelize";
import sequelize from "../../db/config.js";
import SaleTicket from "../SaleTicket/index.js";
import MatchTicket from "./MatchTicket.js";

const Ticket = sequelize.define("Ticket", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },

});
Ticket.hasMany(SaleTicket);
SaleTicket.belongsTo(Ticket);

Ticket.hasMany(MatchTicket);
MatchTicket.belongsTo(Ticket);

export default Ticket;
