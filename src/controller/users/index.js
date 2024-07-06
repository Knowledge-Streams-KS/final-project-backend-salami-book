
import userModel from "../../model/users/index.js"


const usersController = {

    getAll: async (req, res) => {
        try {
            const users = await userModel.findAll({
            });
            res.status(200).json({

                data: users
            });
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal Server Error" });

        }


    },

    getSingle: async (req, res) => {
        try {
            const { id } = req.params;

            const user = await userModel.findByPk(id);
            if (!user) {
                return res.status(404).json({ message: "No user with this name" });
            }
            res.status(200).json({ data: user });
        } catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
    },

    create: async (req, res) => {
        try {
            const payload = req.body;
            console.log("Payload is ", payload);

            const user = new userModel();
            user.userName = payload.userName;
            await user.save();

            res.status(200).json({ message: "User created", user });



        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal Server Error" });

        }
    }

}
export default usersController;