import createError, {HttpError} from 'http-errors';
import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import { connectDB } from './mongoose/database';
import dotenv from 'dotenv';
import transactionRouter from './routes/transaction.routes';
import usersRouter from './routes/users.route';
import balanceRouter from './routes/balances.route';
import cors from 'cors';

dotenv.config();

connectDB();

const app = express();

// CORS configuration
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

// Middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Static files (if any)
app.use(express.static(path.join(__dirname, '../public')));

// API Routes - Add clear prefixes
app.use('/api/transactions', transactionRouter);
app.use('/api/users', usersRouter);
app.use('/api/balances', balanceRouter);

// Serve React static files
app.use(express.static(path.join(__dirname, '../views/transfer-client/build')));

// React catch-all route (must come after API routes)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/transfer-client/build', 'index.html'));
});

// Error handlers remain the same
// ...
// 404 handler (for unknown API routes)
app.use(function(req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function (err: HttpError, req: Request, res: Response, next: NextFunction) {
  res.status(err.status || 500).json({
    message: err.message || 'Something went wrong',
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`*********************************************************************** \n SERVER IS RUNNING ON PORT :${PORT} \n***********************************************************************`);
});

module.exports = app;
