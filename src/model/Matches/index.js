import sequelize from "../../db/config.js";
import { DataTypes } from "sequelize";
import bookingModel from "../Booking/index.js";

const matchesModel = sequelize.define('Matches', 
    {
        team1: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        team2: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        team1Score: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        team2Score: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        completed: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    }
)

matchesModel.hasOne(bookingModel);
bookingModel.belongsTo(matchesModel);

export default matchesModel;