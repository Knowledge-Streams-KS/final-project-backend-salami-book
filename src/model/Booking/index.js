import sequelize from "../../db/config.js";
import { DataTypes } from "sequelize";

const bookingModel = sequelize.define('Booking', {
    date: {
        type: DataTypes.STRING,
        allowNull: false
    },
    time: {
        type: DataTypes.STRING,
        allowNull: false    
    }
})

export default bookingModel;