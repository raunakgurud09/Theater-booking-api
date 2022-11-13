import { FilterQuery, LeanDocument, UpdateQuery } from 'mongoose';

import config from '../configs/index.config';
import Session, { SessionDocument } from '../model/session.model';
import { UserDocument } from '../model/user.model';
import { sign, decode } from '../utils/jwt.utils';
import { get } from 'lodash';
import { findUser } from './user.service';

export async function createSession(userId: string, userAgent: string) {
  const session = await Session.create({ user: userId, userAgent });

  return session.toJSON();
}

export function createAccessToken({
  user,
  session
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user:
    | any
    | Omit<UserDocument, 'password'>
    | LeanDocument<Omit<UserDocument, 'password'>>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  session:
    | any
    | Omit<SessionDocument, 'password'>
    | LeanDocument<Omit<SessionDocument, 'password'>>;
}) {
  // Build and return the new access token
  const accessToken = sign(
    { ...user, session: session._id },
    { expiresIn: config.accessTokenTtl } // 15 minutes
  );

  return accessToken;
}

export async function reIssueAccessToken({
  refreshToken
}: {
  refreshToken: string;
}) {
  // Decode the refresh token
  const { decoded } = await decode(refreshToken);
  // const decoded = (await dec).decoded
  if (!decoded || !get(decoded, '_id')) return false;

  // Get the session
  const session = await Session.findById(get(decoded, '_id'));

  // Make sure the session is still valid
  if (!session || !session?.valid) return false;

  const user = await findUser({ _id: session.user });

  if (!user) return false;

  const accessToken = createAccessToken({ user, session });

  return accessToken;
}

export async function updateSession(
  query: FilterQuery<SessionDocument>,
  update: UpdateQuery<SessionDocument>
) {
  return Session.updateOne(query, update);
}

export async function findSessions(query: FilterQuery<SessionDocument>) {
  return Session.find(query).lean();
}
