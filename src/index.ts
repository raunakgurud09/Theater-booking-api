// "use strict";
import express from "express";
import connectDB from "./utils/connectDB";
import deserializeUser from "./middleware/deserializeUser.middleware";



const app = express();
app.use(deserializeUser);

// Middleware
app.use(express.json())
app.use(express.urlencoded({extended:false}))

// Database


// Routes
import userRouter  from "./router/user.router"

app.use('/api/v1',userRouter)

const PORT = 3000;

app.listen(PORT,async()=>{
    console.log(`server is running on ${PORT}...`)
    await connectDB()
})