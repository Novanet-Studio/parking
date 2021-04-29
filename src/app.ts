import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import readEnv from './config/env';
import { createRoles } from './config/bootstrap';
import { user as userService } from './services';

import type { Express } from 'express';

readEnv();

const app: Express = express();
const port = process.env.PORT || 3000;

createRoles();

// Settings
app.set('port', port);

// Middlewares
app.use(cors({ origin: '*' }));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/v1/users', userService);

export default app;
