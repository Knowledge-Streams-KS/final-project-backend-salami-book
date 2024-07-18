import Ticket from "../../model/Ticket/index.js";
import MatchTicket from "../../model/Ticket/MatchTicket.js";
import matchesModel from "../../model/Matches/index.js"

const ticketController = {
    getAll: async (req, res) => {
        try {
            const data = await Ticket.findAll({
                order: [["createdAt", "DESC"]],
            });
            res.status(200).json({ data });
        } catch (error) {
            res.status(500).json({ message: "Internal Server Error" });
        }
    },
    create: async (req, res) => {
        try {
            const payload = req.body;
            console.log(payload, "payload");
            const ticketCategory = new Ticket();
            ticketCategory.name = payload.name;
            ticketCategory.price = payload.price;
            await ticketCategory.save();
            res.status(200).json({ message: "ticketCategory created", ticketCategory });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal server error" });
        }
    },
    createMatchTicket: async (req, res) => {
        try {
            const { MatchId, TicketId, stock } = req.body;

            // Check if the MatchTicket already exists for the given MatchId and TicketId
            const existingMatchTicket = await MatchTicket.findOne({
                where: {
                    MatchId,
                    TicketId,
                }
            });

            if (existingMatchTicket) {
                return res.status(400).json({ message: `MatchTicket for TicketId ${TicketId} and MatchId ${MatchId} already exists` });
            }

            // Check if the Ticket exists
            const ticket = await Ticket.findByPk(TicketId);
            if (!ticket) {
                return res.status(404).json({ message: `Ticket with id ${TicketId} not found` });
            }

            // Check if the Match exists
            const match = await matchesModel.findByPk(MatchId);
            if (!match) {
                return res.status(404).json({ message: `Match with id ${MatchId} not found` });
            }

            // Create the MatchTicket entry
            const newMatchTicket = await MatchTicket.create({
                MatchId,
                TicketId,
                stock,
            });

            res.status(201).json({ message: "MatchTicket created", MatchTicket: newMatchTicket });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: error.message || "Internal server error" });
        }

    },

    getAllMatchTickets: async (req, res) => {
        try {
            const data = await MatchTicket.findAll({
                order: [["createdAt", "DESC"]],
                attributes: ['stock', 'MatchId'],
                include: [
                    {
                        model: Ticket,
                        attributes: ['name', 'price'], // Optional: Include specific booking attributes
                    }
                ]

            });
            res.status(200).json({ data });
        } catch (error) {
            res.status(500).json({ message: "Internal Server Error" });
        }
    },

    getMatchTickets: async (req, res) => {
        const { MatchId } = req.params;

        try {
            // Fetch MatchTickets where MatchId matches
            const matchTickets = await MatchTicket.findAll({
                where: {
                    MatchId: MatchId
                },
                attributes: ['stock'],
                include: [{
                    model: Ticket,
                    attributes: ['name', 'price'] // Include Ticket attributes
                }]
            });

            res.status(200).json({ matchTickets });
        } catch (error) {
            console.error('Error fetching match tickets:', error);
            res.status(500).json({ message: 'Internal server error' });
        }

    }


}
export default ticketController;