/**
 * Create the auth middleware
 * Create the idempotency handler
 */

import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import { getUser } from '../entity/queries';

export const authenticate: RequestHandler = async (req, res, next) => {
  try {
    const token = req.headers.authorization as string;
    if (!token) {
      throw new Error('authentication failed');
    }

    const { id } = jwt.verify(token, 'testPrivateKey') as { id: string };
    const user = await getUser(req.body.username, req.body.password);
    if (!user) {
      throw new Error('authentication failed');
    }

    req.body.user_id = user.user_id;
    return next();
  } catch (error) {
    return next(error);
  }
};
