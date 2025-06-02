import express from 'express';
import { getUserBalance } from '../controller/balances.controller';


const balanceRouter = express.Router();


balanceRouter.get('/:id',getUserBalance)

export default balanceRouter;