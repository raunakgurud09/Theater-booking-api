// "use strict";
import express from "express";
import connectDB from "./utils/connectDB";
const app = express();



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