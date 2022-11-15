// "use strict";
import express from "express";
import connectDB from "./utils/connectDB";
import deserializeUser from "./middleware/deserializeUser.middleware";
import config from "./configs/index.config"


const app = express();
app.use(deserializeUser);

// Middleware
app.use(express.json())
app.use(express.urlencoded({extended:false}))

// Database


// Routes
import userRouter  from "./router/user.router"
import adminRouter from "./router/admin.router"

app.use('/api/v1',userRouter)
app.use('/api/v1/admin',adminRouter)

const PORT = config.port as number

app.listen(PORT,async()=>{
    console.log(`server is running on ${PORT}...`)
    await connectDB()
})