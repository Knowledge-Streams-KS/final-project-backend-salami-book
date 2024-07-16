import sequelize from "../../db/config.js";
import fieldsModel from "../fields/index.js";
import { DataTypes } from "sequelize";

const bookingModel = sequelize.define('Booking', {


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