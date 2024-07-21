import SalesModel from "../../model/Sales/index.js";
import SaleTicket from "../../model/SaleTicket/index.js";
import Ticket from "../../model/Ticket/index.js";
import sequelize from "../../db/config.js";
import MatchTicket from "../../model/Ticket/MatchTicket.js";
import matchesModel from "../../model/Matches/index.js";
import Customer from "../../model/customer/index.js";


const salesController = {

  getAll: async (req, res) => {
    try {
      const sales = await SalesModel.findAll({
        order: [["createdAt", "DESC"]],
        limit: 5
      });
      res.status(200).json({ message: "Sales are: ", sales });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  getSingle: async (req, res) => {

    try {
      const { id } = req.params;

      const sale = await SalesModel.findByPk(id, {
        include: [{
          model: SaleTicket,
          attributes: ['quantity'],
          include: [{
            model: Ticket,
            attributes: ['name']
          }]
        }]
      });

      if (!sale) {
        return res.status(404).json({ message: `Sale not found of this ${id} id.` })
      }
      res.status(200).json({ message: "Sales are: ", sale });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }

  },
  getSingleSaleTicket: async (req, res) => {

    try {
      const { id } = req.params;

      const sale = await SaleTicket.findByPk(id, {
        include: [Ticket]
      })
      if (!sale) {
        return res.status(404).json({ message: `Sale not found of this ${id} id.` })
      }
      res.status(200).json({ message: "Sales are: ", sale });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }

  },

  // createSales: async (req, res) => {
  //   let transactionStatus = "rolled back";
  //   try {
  //     await sequelize.transaction(async (transaction) => {
  //       const payload = req.body;

  //       // Create a sales entry with an initial totalAmount of 0
  //       const sale = await SalesModel.create({ totalAmount: 0 }, { transaction });

  //       const salesTickets = [];

  //       // Loop through each sales ticket in the payload
  //       for (const saleTicket of payload.salesTickets) {
  //         const { TicketId, quantity } = saleTicket;
  //         const MatchId = payload.MatchId; // Ensure MatchId is taken from payload

  //         const ticket = await Ticket.findByPk(TicketId, { transaction });

  //         if (!ticket) {
  //           throw new Error(`Ticket with id ${TicketId} not found`);
  //         }

  //         if (isNaN(quantity) || quantity <= 0) {
  //           throw new Error(`Invalid quantity for ticket ${ticket.name}`);
  //         }

  //         // Fetch the match
  //         const match = await matchesModel.findByPk(MatchId, { transaction });
  //         if (!match) {
  //           throw new Error(`Match with id ${MatchId} not found`);
  //         }

  //         // Fetch the match-specific ticket stock
  //         const matchTicket = await MatchTicket.findOne({
  //           where: {
  //             TicketId: ticket.id,
  //             MatchId: match.id,
  //           },
  //           transaction,
  //         });

  //         if (!matchTicket) {
  //           throw new Error(`Stock for ticket ${ticket.name} and match ${match.id} not found`);
  //         }

  //         if (quantity > matchTicket.stock) {
  //           throw new Error(`Insufficient stock for ticket ${ticket.name} for match ${match.id}`);
  //         }

  //         // Add SaleId, TicketId, and MatchId to the salesTicket
  //         salesTickets.push({
  //           ...saleTicket,
  //           price: ticket.price,
  //           SaleId: sale.id,
  //           MatchId, 
  //         });

  //         // Deduct ticket quantities from stock for the specific match
  //         matchTicket.stock -= quantity;
  //         await matchTicket.save({ transaction });
  //       }

  //       // Bulk create all sale tickets for the current sale
  //       await SaleTicket.bulkCreate(salesTickets, { transaction });

  //       // Calculate total amount for the sale
  //       const totalAmount = salesTickets.reduce((sum, current) => {
  //         return sum + (current.price * current.quantity);
  //       }, 0);

  //       // Update the totalAmount in the sale entry
  //       sale.totalAmount = totalAmount;
  //       await sale.save({ transaction });

  //       // Set transaction status to completed
  //       transactionStatus = "completed";

  //       // Respond with success message and details
  //       res.status(200).json({ message: "Sale created", sale, transactionStatus });
  //     });
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({ message: error.message || "Internal server error", transactionStatus });
  //   }
  // }

  createSales: async (req, res) => {
    let transactionStatus = "rolled back";
    try {
      await sequelize.transaction(async (transaction) => {
        const payload = req.body;
        const userId = req.user.id; // Get user ID from the authenticated request

        // Log payload and user ID for debugging
        console.log("Payload:", payload);
        console.log("User ID:", userId);

        // Create or find the customer record
        const [customer, created] = await Customer.findOrCreate({
          where: { UserId: userId },
          defaults: {
            name: payload.userDetails.name,
            address: payload.userDetails.address,
            contact: payload.userDetails.contact,
          },
          transaction,
        });

        // Log customer creation status
        console.log("Customer:", customer);
        console.log("Created:", created);

        if (!customer) {
          throw new Error("Customer creation failed");
        }

        // Create a sales entry with an initial totalAmount of 0 and reference to the customer
        const sale = await SalesModel.create(
          { totalAmount: 0, CustomerId: customer.id },
          { transaction }
        );

        // Log sale creation
        console.log("Sale:", sale);

        const salesTickets = [];

        // Loop through each sales ticket in the payload
        for (const saleTicket of payload.cartItems) {
          const { TicketId, quantity, price, MatchId } = saleTicket;

          // Ensure price is a number
          const numericPrice = parseFloat(price);
          if (isNaN(numericPrice)) {
            throw new Error(`Invalid price for ticket ID ${TicketId}`);
          }

          const ticket = await Ticket.findByPk(TicketId, { transaction });
          if (!ticket) {
            throw new Error(`Ticket with ID ${TicketId} not found`);
          }

          if (isNaN(quantity) || quantity <= 0) {
            throw new Error(`Invalid quantity for ticket ${ticket.name}`);
          }

          // Fetch the match
          const match = await matchesModel.findByPk(MatchId, { transaction });
          if (!match) {
            throw new Error(`Match with ID ${MatchId} not found`);
          }

          // Fetch the match-specific ticket stock
          const matchTicket = await MatchTicket.findOne({
            where: {
              TicketId: ticket.id,
              MatchId: match.id,
            },
            transaction,
          });

          if (!matchTicket) {
            throw new Error(`Stock for ticket ${ticket.name} and match ${match.id} not found`);
          }

          if (quantity > matchTicket.stock) {
            throw new Error(`Insufficient stock for ticket ${ticket.name} for match ${match.id}`);
          }

          // Add SaleId, TicketId, MatchId, and customerId to the salesTicket
          const saleTicketEntry = {
            ...saleTicket,
            price: numericPrice,
            SaleId: sale.id,
            MatchId,
            CustomerId: customer.id, // Add customerId
          };
          console.log("Customer ID in saleTicketEntry:", saleTicketEntry.CustomerId);

          // Log sale ticket entry
          console.log("Sale Ticket Entry:", saleTicketEntry);

          salesTickets.push(saleTicketEntry);

          // Deduct ticket quantities from stock for the specific match
          matchTicket.stock -= quantity;
          await matchTicket.save({ transaction });
        }

        // Log salesTickets array
        console.log("Sales Tickets Array:", salesTickets);

        // Bulk create all sale tickets for the current sale
        await SaleTicket.bulkCreate(salesTickets, { transaction });

        // Calculate total amount for the sale
        const totalAmount = salesTickets.reduce((sum, current) => {
          return sum + (current.price * current.quantity);
        }, 0);

        // Update the totalAmount in the sale entry
        sale.totalAmount = totalAmount;
        await sale.save({ transaction });

        // Set transaction status to completed
        transactionStatus = "completed";

        // Respond with success message and details
        res.status(200).json({ message: "Sale created", sale, transactionStatus });
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message || "Internal server error", transactionStatus });
    }
  }




}
export default salesController;
