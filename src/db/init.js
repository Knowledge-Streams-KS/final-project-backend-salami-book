import sequelize from "./config.js";
import userModel from "../model/users/index.js";
import tokenModel from "../model/auth/token.js";
import fieldsModel from "../model/fields/index.js";
import matchesModel from "../model/Matches/index.js";
import bookingModel from "../model/Booking/index.js";
import playersModel from "../model/players/index.js";
import teamModel from "../model/teams/index.js";





const syncDb = async () => {
    await sequelize.sync({ alter: true, force: false });
    await userModel.sync({ alter: true });
    await tokenModel.sync({ alter: true, force: false });
    await fieldsModel.sync({ alter: true, force: false });
    await matchesModel.sync({alter: true, force: false});
    await bookingModel.sync({alter: true, force: false });
    await playersModel.sync({ alter: true, force: false});
    await teamModel.sync({ alter: true, force: false });

    console.log("Models created");
}

export default syncDb;