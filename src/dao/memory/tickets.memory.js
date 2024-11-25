export default class TicketMemory {
  constructor() {
    this.tickets = [];
    this.nextId = 1;
  }
  async getTickets() {
    return this.tickets;
  }
  async getTicketById(id) {
    return this.tickets.find((ticket) => ticket.id === id) || null;
  }
  async createTicket(ticketData) {
    const ticket = { id: this.nextId++, ...ticketData };
    this.tickets.push(ticket);
    return ticket;
  }
}
