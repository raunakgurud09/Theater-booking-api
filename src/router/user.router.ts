import express from "express"
const Router = express.Router()

import { Express,Request,Response } from "express";

import { createUserHandle } from "../controller/user.controller";
import { createUserSchema } from "../schema/user.schema";
import validate from "../middleware/validate.middleware";



Router.get('/ping-check',(req:Request,res:Response)=>{
    console.log('working perfectly')
    res.status(200).send('working')
})

Router.post('/user',validate(createUserSchema),createUserHandle)

export default Router