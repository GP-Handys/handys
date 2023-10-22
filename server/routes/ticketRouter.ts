import { Ticket } from "../models/Ticket";
import { Request, Response } from "express";
import { extractUserFromJwt } from "../utils/tokenUtils";
import { User } from "../models/User";
import { sendEmail } from "../utils/emailUtils";

export const getTickets = async (req: Request, res: Response) => {
  try {
    const jwt: string = req.get("Authorization")?.toString()!;
    const userId: number = extractUserFromJwt(jwt);
    const user: User | null = await User.findByPk(userId);
    let tickets: Ticket[];
    if (user?.is_sys_admin) {
      tickets = await Ticket.findAll();
    } else {
      tickets = await Ticket.findAll({ where: { userId: userId } });
    }
    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const submitTicket = async (req: Request, res: Response) => {
  const jwt: string = req.get("Authorization")?.toString()!;
  const userId: number = extractUserFromJwt(jwt);
  const { content } = req.body;
  try {
    const user: User | null = await User.findByPk(userId);
    const ticket = await Ticket.create({ userId, content });
    await sendEmail(user!.email);
    res.status(200).json(ticket);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const resolveTicket = async (req: Request, res: Response) => {
  try {
    const jwt: string = req.get("Authorization")?.toString()!;
    const userId: number = extractUserFromJwt(jwt);
    const user: User | null = await User.findByPk(userId);
    const ticketId = req.params.ticketId;
    let ticket = await Ticket.findByPk(ticketId);
    if (ticket?.userId == userId || user?.is_sys_admin) {
      ticket!.is_resolved = true;
      await ticket?.save();
      res.sendStatus(200);
    } else {
      res.sendStatus(403);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
