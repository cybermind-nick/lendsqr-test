import { RequestHandler } from 'express';
import Joi from 'joi';
import {
  
  depositQuery,
  getUser,
  transferQuery,
  withdrawQuery,
  getUserID
} from '../entity/queries';
// createUserAccount, part of imports

// export const createAccount: RequestHandler = (req, res, next) => {
//   try {
//     const { userId } = req;
//     createUserAccount(db, userId);
//     return res
//       .status(201)
//       .json({ message: 'user account created successfully' });
//   } catch (error) {
//     next(error);
//   }
// };

export const fundUserAccount: RequestHandler = (req, res, next) => {
  try {
    const userId = req.body.user_id;
    const schema = Joi.object({
      amount: Joi.number().required()
    });
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    depositQuery(userId, req.body.amount); // M

    return res
      .status(200)
      .json({ message: 'user account funded successfully' });
  } catch (error) {
    next(error);
  }
};

export const withdrawFromUserAccount: RequestHandler = (req, res, next) => {
  try {
    const userId = req.body.user_id;
    const schema = Joi.object({
      amount: Joi.number().required()
    });
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    withdrawQuery(userId, req.body.amount);

    return res.status(200).json({ message: 'withdrawal successful' });
  } catch (error) {
    next(error);
  }
};

export const transferToAnotherAccount: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const userId = req.body.user_id;
    const receiver_name: string = req.body.receiver
    const schema = Joi.object({
      amount: Joi.number().required(),
      receiver: Joi.string().required()
    });
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { amount, receiver } = req.body.amount
    const user = await getUserID(receiver_name);
    if (!user) {
      throw new Error('invalid username');
    }

    await transferQuery(userId, receiver, amount);

    return res.status(200).json({ message: 'transfer successful' });
  } catch (error) {
    next(error);
  }
};
