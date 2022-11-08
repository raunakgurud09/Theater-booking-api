import { Request, Response } from 'express';
import { omit } from 'lodash';
import { createUser } from '../services/user.service';


export async function createUserHandle(req: Request, res: Response) {
  try {
    // eslint-disable-next-line
    const user:any= await createUser(req.body);
    return res.send(omit(user.toJSON(), 'password'));
  } catch (e) {
    console.log(e);
    return res.status(409).send(e);
  }
  // res.status(200).send('ok')
}
