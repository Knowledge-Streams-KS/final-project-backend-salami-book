import bookingModel from "../../model/Booking/index.js";
import matchesModel from "../../model/Matches/index.js";
import fieldsModel from "../../model/fields/index.js";


const matchesController = {
    getAll: async (req, res) => {
        try {
            const matches = await matchesModel.findAll({
                include: {
                    model: bookingModel
                }
            });
            res.status(200).json({ message: "All Matches with bookings", matches })
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    },
    // post: async (req, res) => {
    //     try {
    //         const payload = req.body;
    //         const match = await matchesModel.create({
    //             team1: payload.team1,
    //             team2: payload.team2,
    //             FieldId: payload.field,
    //             team1Score: payload.team1Score ? payload.team1Score : 0,
    //             team2Score: payload.team2Score ? payload.team2Score : 0,
    //             completed: payload.completed ? payload.completed : false
    //         })

    //         const booking = await bookingModel.create({

    //             MatchId: match.id,
    //             time: payload.bookingTime,
    //             date: payload.bookingDate
    //         })

    //         res.status(200).json({ message: "Match Created", match, booking })
    //     } catch (error) {
    //         console.log(error)
    //         res.status(500).json(error)
    //     }
    // }
    post: async (req, res) => {
        try {
            const payload = req.body;
            const match = await matchesModel.create({
                team1: payload.team1,
                team2: payload.team2,
                team1Score: payload.team1Score ? payload.team1Score : 0,
                team2Score: payload.team2Score ? payload.team2Score : 0,
                completed: payload.completed ? payload.completed : false,
                FieldId: payload.fieldId // Ensure 'fieldId' matches your payload structure
            });

            const booking = await bookingModel.create({
                MatchId: match.id,
                time: payload.bookingTime,
                date: payload.bookingDate
            });

            res.status(200).json({ message: "Match Created", match, booking });
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    },
    getBookedFields: async (req, res) => {
        try {
            // Query fields that are booked
            const bookedFields = await fieldsModel.findAll({
                include: [
                    {
                        model: matchesModel,
                        include: [
                            {
                                model: bookingModel,
                                attributes: ['time', 'date'], // Optional: Include specific booking attributes
                            }
                        ]
                    }
                ]
            });

            res.status(200).json(bookedFields);
        } catch (error) {
            console.error("Error fetching booked fields:", error);
            res.status(500).json({ error: "Failed to fetch booked fields" });
        }
    }


}

export default matchesController