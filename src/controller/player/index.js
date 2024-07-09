import playersModel from "../../model/players/index.js"


const playerController = {
    getAll: async (req, res) => {
        try {
            const players = await playersModel.findAll()
            res.status(200).json({message: "Here are the players", players})
        } catch (error) {
            console.log(error)
            res.status(500).json({message: "Internal Server Error"})
        }
    },
    getbyId: async (req, res) => {
        try {
            const { id } = req.params;
            
        } catch (error) {
            
        }
    },
    post: async (req, res) => {
        try {
            const payload = req.body;
            const player = await playersModel.create({
                name: payload.name,
                team: payload.team,
                goals: payload.goals,
                assists: payload.assists,
                position: payload.position,
                motm: payload.motm, 
                TeamId: payload.teamId
            })

            res.status(200).json({message: "Player Created", player})
        } catch (error) {
            console.log("console", error);
            res.status(500).json({message: "Internal Server Error"})
        }
    }, 
    tempPost: async (req, res) => {
        try {
            const payload = req.body;
            const b = payload.players
            console.log(payload)
            await playersModel.bulkCreate(b)

            res.status(200).json({message: "Bulk Created", b})
        } catch (error) {
            console.log("console", error);
            res.status(500).json({message: "Internal Server Error"})
        }
    },
    update: async (req, res) => {
        try {

            const payload = req.body;

        } catch (error) {
            
        }
    },
    delete: async (req, res) => {
        try {
            const { id } = req.params;
            const player = await playersModel.findOne({where: {id}})

            if(!player){
                return res.status(400).json({message: "Player Not Found"})
            }

            await player.destroy()
            res.status(200).json({message: "Player Deleted"})
        } catch (error) {
            console.log(error);
            res.status(500).json({message: "Internal Server Error"})
        }
    }
}

export default playerController;