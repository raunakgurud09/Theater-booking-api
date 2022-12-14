import { Request, Response } from 'express';
import { omit, get } from 'lodash';

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

export async function getAuthorizedUser(req: Request, res: Response) {
  const user = get(req, 'user');
  res.status(200).send(user);
}

export async function bookTicketHandler(req: Request, res: Response) {
  try {
    const { screen, showId } = get(req, 'params');
    const { seat } = get(req, 'query');
    const user = get(req, 'user');
    const ticket = await createTicket(screen, showId, seat, user);
    return res.send(ticket);
  } catch (error) {
    console.log(error);
  }
}

export async function cancelTicketHandler(req: Request, res: Response) {
  try {
    const { screen, showId } = get(req, 'params');
    const { seat } = get(req, 'query');
    const user = get(req, 'user');
    const ticket = await cancelTicket(screen, showId, seat, user);
    return res.send(ticket);
  } catch (error) {
    console.log(error);
  }
}

export async function getTicketHandler(req: Request, res: Response) {
  try {
    const user = get(req, 'user');
    const ticket = await getTicket(user);
    return res.send({ user, ticket });
  } catch (error) {
    console.log(error);
  }
}
