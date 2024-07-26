import sequelize from "../../db/config.js";
import { DataTypes } from "sequelize";
import bookingModel from "../Booking/index.js"
import fieldsModel from "../fields/index.js";
// import Ticket from "../Ticket/index.js";
import MatchTicket from "../Ticket/MatchTicket.js";
import SaleTicket from "../SaleTicket/index.js";

const matchesModel = sequelize.define('Matches', {
    team1: {
        type: DataTypes.STRING,
        allowNull: false
    },
    team2: {
        type: DataTypes.STRING,
        allowNull: false
    },
    team1Score: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 0
    },
    team2Score: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 0
    },
    completed: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
});

fieldsModel.hasOne(matchesModel); // A Field can have at most one Match
matchesModel.belongsTo(fieldsModel); // Each Match belongs to one Field

// Ticket.belongsTo(matchesModel);
// matchesModel.hasMany(Ticket);

matchesModel.hasMany(MatchTicket);
MatchTicket.belongsTo(matchesModel);

matchesModel.hasMany(SaleTicket);
SaleTicket.belongsTo(matchesModel);

bookingModel.belongsTo(matchesModel); // Each bookingModel belongs to one Match
matchesModel.hasMany(bookingModel);

export default matchesModel;