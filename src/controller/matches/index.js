import bookingModel from "../../model/Booking/index.js";
import matchesModel from "../../model/Matches/index.js";


const matchesController = {
    getAll: async (req, res) => {
        try {
            const matches = await matchesModel.findAll({
                include: {
                    model: bookingModel
                }
            });
            res.status(200).json({message: "All Matches with bookings", matches})
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    },
    post: async (req, res) => {
        try {
            const payload = req.body; 
            const match = await matchesModel.create({
                team1: payload.team1,
                team2: payload.team2,
                team1Score: payload.team1Score ? payload.team1Score : 0,
                team2Score: payload.team2Score ? payload.team2Score : 0,
                completed: payload.completed ? payload.completed : false
            })

            const booking = await bookingModel.create({
                FieldId: payload.field,
                MatchId: match.id,
                time: payload.bookingTime,
                date: payload.bookingDate
            })

            res.status(200).json({message: "Match Created", match, booking})
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    }
}

export default matchesController