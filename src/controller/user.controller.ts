import { Request, Response } from 'express';
import { omit } from 'lodash';
import { UserDocument } from '../model/user.model';
import {
  cancelTicket,
  createTicket,
  createUser,
  getTicket
} from '../services/user.service';

export async function createUserHandle(req: Request, res: Response) {
  try {
    // eslint-disable-next-line
    const user: any = await createUser(req.body);
    return res.send(omit(user.toJSON(), 'password'));
  } catch (e) {
    console.log(e);
    return res.status(409).send(e);
  }
  // res.status(200).send('ok')
}

export async function getAuthorizedUser(req: any, res: Response) {
  const user: UserDocument = req.user;
  res.status(200).send(user);
}

export async function bookTicketHandler(req: any, res: Response) {
  try {
    // console.log(req.params,req.query)
    const { screen, showId } = req.params;
    const { seat } = req.query;
    const user = req.user;
    const ticket = await createTicket(screen, showId, seat, user);
    console.log(ticket,"ticket");
    return res.send(ticket);
  } catch (error) {
    console.log(error);
  }
}

export async function cancelTicketHandler(req: Request | any, res: Response) {
  try {
    const { screen, showId } = req.params;
    const { seat } = req.query;
    const user = req.user;
    const ticket = await cancelTicket(screen, showId, seat, user);
    return res.send({ ticket, message: 'Ticket canceled' });
  } catch (error) {
    console.log(error);
  }
}

export async function getTicketHandler(req: any, res: Response) {
  try {
    const user = req.user;
    const ticket = await getTicket(user);
    return res.send(ticket);
  } catch (error) {
    console.log(error);
  }
}
