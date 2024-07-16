import Ticket from "../../model/Ticket";

const ticketController = {
    create: async (req, res) => {
        try {
            const payload = req.body;
            console.log(payload, "payload");
            const ticketCategory = new Ticket();
            ticketCategory.name = payload.name;
            await category.save();
            res.status(200).json({ message: "category created", category });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal server error" });
        }
    },
}