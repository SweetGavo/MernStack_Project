import createError from 'http-errors';
import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import indexRouter from './routes/index';
import usersRouter from './routes/user';
import session from 'express-session'; 

const app = express();

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false, 
        maxAge: 1000 * 60 * 60 
      }
}) as unknown as express.RequestHandler);


// Serve static files (CSS, JS, images)
app.use(express.static(path.join(__dirname, 'public')));

// HTML pages
app.get('/', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../views/index.html'));
});

app.get('/login', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../views/login.html'));
});

app.get('/signup', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../views/signup.html'));
});

// API Routes
app.use('/api/books', indexRouter);
app.use('/api', usersRouter);


// 404 Handler
app.use((req: Request, res: Response, next: NextFunction) => {
  next(createError(404, 'Page Not Found'));
});

// General Error Handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(err.status || 500);
  res.send(`
    <h1>Error ${err.status || 500}</h1>
    <p>${err.message}</p>
  `);
});

// Start Server
const PORT = process.env.PORT || 5022;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});

export default app;
