import sequelize from "../../db/config.js";
import { DataTypes } from "sequelize";

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

export default matchesModel;