import express from "express"
const Router = express.Router()

import { Request,Response } from "express";

import { createUserHandle, getAuthorizedUser } from "../controller/user.controller";
import { createUserSchema, createUserSessionSchema } from "../schema/user.schema";
import validateRequest from "../middleware/validate.middleware";
import { createUserSessionHandler, getUserSessionsHandler } from "../controller/session.controller";
import requiresUser from "../middleware/requiresUser.middleware";
import authorizePermissions from "../middleware/auth.middleware";



Router.get('/ping-check',(req:Request,res:Response)=>{
    console.log('working perfectly')
    res.status(200).send('working')
})

//Register user
Router.post('/user',validateRequest(createUserSchema),createUserHandle)

//Login user
Router.post('/sessions',validateRequest(createUserSessionSchema),createUserSessionHandler)

Router.get('/sessions',requiresUser,getUserSessionsHandler)
Router.get('/authorized',requiresUser,authorizePermissions("admin"),getAuthorizedUser)



export default Router
