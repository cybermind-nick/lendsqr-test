import { Express } from 'express';
import userRoutes from './user.routes';
import accountRoutes from './account.routes';

export default (app: Express) => {
  app.use('/users', userRoutes);
  app.use('/acccouts', accountRoutes);
};
