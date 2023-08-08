
import  express  from 'express';
import dotenv from 'dotenv';
import mongoose from "mongoose";
import userRouter from './Routers/userRouter.js';
import itemRouter from './Routers/itemsRouter.js';
import orderRouter from './Routers/orderRouters.js';


const app = express();

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)

  .then(() => {
    console.log('connected to db');
  })
  
  .catch((err) => {
    console.log(err.message);
  });

app.get('/',(req,res)=>{
    console.log('server is starting ');
})

app.use(express.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization,auth-token"
  );
  next();
})

app.use('/api/users',userRouter);
app.use('/api/items', itemRouter);
app.use('/api/order', orderRouter);


const  port = process.env.PORT || 8000;
app.listen(port, () => {console.log(`server start at http://localhost:${port}`)})
