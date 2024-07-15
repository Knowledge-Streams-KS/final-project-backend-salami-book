import sequelize from "../../db/config.js";
import { DataTypes } from "sequelize";
import playersModel from "../players/index.js";

const teamModel = sequelize.define('Team', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    division: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

teamModel.hasMany(playersModel);
playersModel.belongsTo(teamModel);

export default teamModel;