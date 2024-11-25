import TicketDTO from "../../dao/DTOs/ticket.dto.js";

export default class TicketRepository {
  constructor(dao) {
    this.dao = dao;
  }

  async getTickets() {
    return await this.dao.getTickets();
  }

  async getTicketById(id) {
    return await this.dao.getTicketById(id);
  }

  async createTicket(ticket) {
    let ticketData = new TicketDTO(ticket);
    return await this.dao.createTicket(ticketData);
  }
}
