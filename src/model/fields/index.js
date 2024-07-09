import { DataTypes } from "sequelize";
import sequelize from "../../db/config.js";

const fieldsModel = sequelize.define('Fields', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING(500),
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
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
    }
})

export default fieldsModel;
