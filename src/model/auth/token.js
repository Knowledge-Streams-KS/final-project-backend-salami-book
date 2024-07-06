import { DataTypes } from "sequelize";
import sequelize from "../../db/config.js";


const tokenModel = sequelize.define("Token", {
    // Model attributes are defined here
    token: {
        type: DataTypes.STRING(500),
        allowNull: false,
    }
});

export default tokenModel;
