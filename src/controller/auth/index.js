import userModel from "../../model/users/index.js";
import { hash, compare } from "bcrypt";
import jwt from "jsonwebtoken";
import tokenModel from "../../model/auth/token.js";

const AuthController = {
    signup: async (req, res) => {
        try {
           
            const { name, email, password } = req.body;
            const user = await userModel.findOne({
                where: { email }
            })

            if (user) {
                return res.status(400).json({ message: "User already exists" });
            }
            const hpassword = await hash(password, 10)
            const userData = await userModel.create({
                name,
                email,
                password: hpassword
            })

            return res.status(201).json({ message: "User Registered Successfully", userData });

        } catch (error) {
            console.log(error)
            res.status(500).json({ message: "Internal Server Error" });
        }

    },

    signin: async (req, res) => {
        try {
            const { email, password } = req.body;
            let user = await userModel.findOne({
                where: {
                    email
                }
            })
            if (!user) {
                return res.status(400).json("Invalid credentials");
            }

            const checkPassword = await compare(password, user.password);
            if (!checkPassword) {
                return res.status(400).json("Invalid credentials");
            }
            delete user.password;
            user = user.toJSON();
            const token = jwt.sign(user, process.env.JWT_SECRET_KEY, {
                expiresIn: '24hr'
            })

            await tokenModel.create({
                token
            });
            console.log("token is: ", token);
            // console.log("request is : ", req.headers);
            res.status(200).json({ data: user, token })


        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }


};
export default AuthController;