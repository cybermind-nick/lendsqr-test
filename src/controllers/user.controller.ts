import { RequestHandler } from 'express';
import Joi from 'joi';
import db from '../entity/db.init';
import { createUserQuery, getUser } from '../entity/queries';
import jwt from 'jsonwebtoken';
import { hashPassword, hashCompare } from '../utils/hash';

export const createNewUser: RequestHandler = async (req, res, next) => {
  try {
    const schema = Joi.object({
      username: Joi.string().required(),
      last_name: Joi.string().required(),
      first_name: Joi.string().required(),
      password: Joi.string().required()
    });
    req.body.password = hashPassword(req.body.password)
    console.log(req.body)
    const { username, first_name, last_name, password } = req.body;
    createUserQuery(db, { username, first_name, last_name, password });
    return res.status(201).json({ message: 'user created successfully' });
  } catch (error) {
    next(error);
  }
};

export const getLoginToken: RequestHandler = async (req, res, next) => {
  try {
    const schema = Joi.object({
      username: Joi.string().required(),
      password: Joi.string().required(),
      email: Joi.string() // added email
    });

    const { username, password } = req.body;
    const query = {db, username}
    const user = await getUser(username, password);
    if (!user) {
      return res.status(400).json({ message: 'invalid username' });
    }

    const token = jwt.sign({ id: user.user_id }, 'testPrivateKey');
    return res
      .status(200)
      .json({ data: { token }, message: 'login successful' });
  } catch (error) {
    next(error);
  }
};
