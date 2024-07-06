import jwt from "jsonwebtoken";
import tokenModel from "../model/auth/token.js";
const authenticateMiddleware = async (req, res, next) => {

    console.log("request is : ", req.headers);
    let token = req.headers.authorization;
    console.log("authorized token is ", token);


    token = token.replace("Bearer ", "");
    console.log("Replaced Bearer token ", token);

    const tokenRecord = await tokenModel.findOne({ where: { token: token } });
    console.log("tokenRecord", tokenRecord);
    if (!tokenRecord) {
        return res.status(401).json({ message: "Unauthorized: Token not found in database" });
    }
    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
        console.log(decode);
        req.user = decode;
        next();

    } catch (error) {
        console.log(error)
        return res.status(401).json({ message: "Server Error" });
    }
}

export default authenticateMiddleware;