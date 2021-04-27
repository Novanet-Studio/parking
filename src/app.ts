import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import type { Express, Request, Response } from 'express';

const app: Express = express();
const port = process.env.PORT || 3000;

// Settings
app.set('port', port);

// Middlewares
app.use(cors({ origin: '*' }));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/v1', (req: Request, res: Response) => res.json({ message: 'Allow Permit Parking' }));

export default app;
