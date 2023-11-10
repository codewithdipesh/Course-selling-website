import express from 'express';
import bodyParser from "body-parser"
import cors from 'cors';
import mongoose from  "mongoose";

import adminRouter from "./routes/admin";
import userRouter from "./routes/user";

const app = express();

app.use(cors())
app.use(express.json());
app.use(bodyParser.json());


app.use("/admin",adminRouter)
app.use("/user",userRouter)
app.get("/",(req,res)=>{
  res.json({message: "This is my Course selling Backend"})
})


//cONNECT TO MongoDB
//Dont misuse it
mongoose.connect('mongodb+srv://paldipakdipa2020:dipeshMongo@cluster0.wnwq78z.mongodb.net/', {
})

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
