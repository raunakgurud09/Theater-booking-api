import express from "express"
const Router = express.Router()

import { Request,Response } from "express";

import { bookTicketHandler, cancelTicketHandler, createUserHandle, getAuthorizedUser, getTicketHandler } from "../controller/user.controller";
import { createUserSchema, createUserSessionSchema } from "../schema/user.schema";
import validateRequest from "../middleware/validate.middleware";
import { createUserSessionHandler, getUserSessionsHandler } from "../controller/session.controller";
import requiresUser from "../middleware/requiresUser.middleware";
import authorizePermissions from "../middleware/auth.middleware";
import { bookTicketSchema } from "../schema/show.schema";



Router.get('/ping-check',(req:Request,res:Response)=>{
    console.log('working perfectly')
    res.status(200).send('working')
})

//Register user
Router.post('/user',validateRequest(createUserSchema),createUserHandle)

//Login user
Router.post('/sessions',validateRequest(createUserSessionSchema),createUserSessionHandler)

//Get all session of a user
Router.get('/sessions',requiresUser,getUserSessionsHandler)

//authorize user only path
Router.get('/authorized',requiresUser,authorizePermissions("admin"),getAuthorizedUser)

//get all available shows
Router.get('/shows')

//get show according to screen number
Router.route('/show/:screen').get()

//book ticket for a show
Router.post("/:screen/show/:showId/book?",validateRequest(bookTicketSchema),requiresUser,bookTicketHandler)

//cancel ticket for a show
Router.delete("/:screen/show/:showId/cancel?",validateRequest(bookTicketSchema),requiresUser,cancelTicketHandler)


//get ticket
Router.get('/get-ticket',requiresUser,getTicketHandler)

export default Router
