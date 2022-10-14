import express, { NextFunction, Request, Response } from 'express';
import routes from './routes';

const app = express();

routes(app);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof Error) {
    return res.status(500).json({ message: err.message });
  } else {
    return res.status(500).json({ message: 'Something went wrong' });
  }
});

export default app;
