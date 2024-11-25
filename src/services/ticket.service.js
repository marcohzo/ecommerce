import { ticketsService } from "../repositories/index.js";

export const createTicket = async (ticketData) => {
  try {
    const ticket = await ticketsService.createTicket(ticketData);
    return ticket;
  } catch (error) {
    throw new Error(`Error creating ticket: ${error.message}`);
  }
};
