import { Request, Response } from 'express';
import { get } from 'lodash';
import config from '../configs/index.config';
import { validatePassword } from '../services/user.service';
import { createAccessToken, createSession, findSessions } from '../services/session.service';
import { sign } from '../utils/jwt.utils';

export async function createUserSessionHandler(req: Request, res: Response) {
  const user = await validatePassword(req.body);

  if (!user) {
    return res.status(401).send('Invalid username or password');
  }
  const session = await createSession(user._id, req.get('user-agent') || '');
  
  const accessToken = await createAccessToken({
    user,
    session
  });
  
  const refreshToken = await sign(session, { expiresIn: config.refreshTokenTtl });
  // console.log(refreshToken)

  return res.send({ accessToken, refreshToken });
}


export async function getUserSessionsHandler(req: Request, res: Response) {
  const userId = get(req, "user._id");

  const sessions = await findSessions({ user: userId, valid: true });

  return res.send(sessions);
}
