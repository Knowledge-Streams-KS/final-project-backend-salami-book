import bookingModel from "../../model/Booking/index.js"


const bookingController = {
    getAll: async (req, res) => {
        try {
            const bookings = await bookingModel.findAll()
            res.status(200).json({message: "All Bookings", bookings})
        } catch (error) {
            console.log(error)
            res.status(500).json({message: "Internal Server Error"})
        }
    }
}

export default bookingController;
