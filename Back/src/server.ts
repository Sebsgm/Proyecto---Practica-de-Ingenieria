import express from 'express'; //ESM Ecmascript Modules
import 'dotenv/config';
import router from './router';
import connectDB from './config/db';

const app = express();
app.use(express.json());
connectDB();
app.use('/',router);

export default app;