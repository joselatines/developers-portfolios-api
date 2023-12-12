import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import session from 'express-session';
import passport from 'passport';
import usersRoutes from './api/routes/users.route';
import authRoutes from './api/routes/auth.route';
import portfoliosRoutes from './api/routes/portfolios.route';
import ratingsRoutes from './api/routes/ratings.route';
import commentsRoutes from './api/routes/comments.route';
import { errorHandlerMiddleware } from './api/middlewares/error-handler';
import { notFoundMiddleware } from './api/middlewares/not-found';

import './utils/passport-setup';
import { isAuthenticatedMiddleware } from './api/middlewares/auth.middleware';

const app = express();

app.use(
  cors({
    origin: '*',
    credentials: true,
  }),
);
app.use(morgan('dev'));
app.use(helmet());
app.use(express.json());
app.use(
  session({ secret: 'keyboard cat', resave: false, saveUninitialized: false }),
);
app.use(passport.initialize());

app.get('/', (req, res) => {
  res.json({
    message: '✨👋🌎',
  });
});

app.get('/api/v1', (req, res) => {
  res.json({
    message: 'Welcome to my API 👋',
  });
});

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', usersRoutes);
app.use('/api/v1/portfolios/comments', commentsRoutes);
app.use('/api/v1/portfolios/ratings', isAuthenticatedMiddleware, ratingsRoutes);
app.use('/api/v1/portfolios', portfoliosRoutes);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

export default app;
