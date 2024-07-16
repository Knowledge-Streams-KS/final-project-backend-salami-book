import Ticket from "../../model/Ticket/index.js";

const ticketController = {
    create: async (req, res) => {
        try {
            const payload = req.body;
            console.log(payload, "payload");
            const ticketCategory = new Ticket();
            ticketCategory.name = payload.name;
            ticketCategory.price = payload.price;
            ticketCategory.stock = payload.stock
            await ticketCategory.save();
            res.status(200).json({ message: "ticketCategory created", ticketCategory });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal server error" });
        }
    },
}
export default ticketController;