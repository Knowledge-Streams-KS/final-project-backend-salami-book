import sequelize from "../../db/config.js";
import { DataTypes } from "sequelize";

const MatchTicket = sequelize.define("MatchTicket", {
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
});

export default MatchTicket;