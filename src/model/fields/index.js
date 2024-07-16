import { DataTypes } from "sequelize";
import sequelize from "../../db/config.js";
import bookingModel from "../Booking/index.js";

const fieldsModel = sequelize.define('Fields', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING(500),
        allowNull: false
    },
    latitude: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        validate: {
            min: -90,
            max: 90
        }
    },
    longitude: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        validate: {
            min: -180, 
            max: 180
        }
    },
    rate: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})

fieldsModel.hasMany(bookingModel)
bookingModel.belongsTo(fieldsModel)

export default fieldsModel;


