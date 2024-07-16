import sequelize from "./config.js";
import userModel from "../model/users/index.js";
import tokenModel from "../model/auth/token.js";
import fieldsModel from "../model/fields/index.js";
import matchesModel from "../model/Matches/index.js";
import bookingModel from "../model/Booking/index.js";
import playersModel from "../model/players/index.js";
import teamModel from "../model/teams/index.js";
import Ticket from "../model/Ticket/index.js";
import SalesModel from "../model/Sales/index.js";
import SaleTicket from "../model/SaleTicket/index.js";





const syncDb = async () => {
    // await sequelize.sync({ alter: true, force: false });
    await userModel.sync({ alter: true });
    await tokenModel.sync({ alter: true, force: false });

    await playersModel.sync({ alter: true, force: false });
    await teamModel.sync({ alter: true, force: false });
    await matchesModel.sync({ alter: true });
    await fieldsModel.sync({ alter: true, force: false });
    await Ticket.sync({ alter: true });
    await bookingModel.sync({ alter: true });
    await SalesModel.sync({ alter: true });
    await SaleTicket.sync({ alter: true });


    console.log("Models created");
}

export default syncDb;