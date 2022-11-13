import { Request, Response } from 'express';
import { lte, omit } from 'lodash';
import { UserDocument } from '../model/user.model';
import { createTicket, createUser } from '../services/user.service';

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
    const { screen } = req.params;
    const { seat } = req.query;
    const user = req.user;
    const ticket = await createTicket(screen, seat, user);

    return res.send(ticket);
  } catch (error) {
    console.log(error);
  }
}
