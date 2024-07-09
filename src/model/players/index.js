import sequelize from "../../db/config.js";
import { DataTypes } from "sequelize";

const playersModel = sequelize.define('Player', 
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        team: {
            type: DataTypes.STRING,
            allowNull: false
        },
        goals: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        assists: {
            type: DataTypes.INTEGER,
            allowNull: false
        }, 
        position: {
            type: DataTypes.STRING,
            allowNull: false
        }, 
        motm: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
        
    }
)

export default playersModel;