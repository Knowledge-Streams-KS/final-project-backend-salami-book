import sequelize from "../../db/config.js";
import { DataTypes } from "sequelize";

const bookingModel = sequelize.define('Booking', {
    fieldName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    time: {
        type: DataTypes.TIME,
        allowNull: false
    }
})

export default bookingModel;