import sequelize from "../../db/config.js";
import { DataTypes } from "sequelize";
import bookingModel from "../Booking/index.js"
import fieldsModel from "../fields/index.js";
import Ticket from "../Ticket/index.js";
const matchesModel = sequelize.define('Matches',
    {
        team1Name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        team2Name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        team1Score: {
            type: DataTypes.INTEGER,
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
    }
)

fieldsModel.hasOne(matchesModel); // A Field can have at most one Match
matchesModel.belongsTo(fieldsModel); // Each Match belongs to one Field

Ticket.belongsTo(matchesModel);
matchesModel.hasMany(Ticket);


bookingModel.belongsTo(matchesModel); // Each bookingModel belongs to one Match
matchesModel.hasMany(bookingModel);
export default matchesModel;