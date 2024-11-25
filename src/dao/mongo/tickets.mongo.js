import Ticket from "./models/ticket.model.js";

export default class TicketsMongo {
  async getTickets() {
    return await Ticket.find();
  }

  async getTicketById(id) {
    return await Ticket.findById(id);
  }

  async createTicket(ticketData) {
    return await Ticket.create(ticketData);
  }
}
