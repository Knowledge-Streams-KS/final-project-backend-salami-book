import sequelize from "./config.js";
import userModel from "../model/users/index.js";
import tokenModel from "../model/auth/token.js";





const syncDb = async () => {
    await sequelize.sync({ alter: true, force: false });
    await userModel.sync({ alter: true });
    await tokenModel.sync({ alter: true, force: false });


    console.log("Models created");
}

export default syncDb;