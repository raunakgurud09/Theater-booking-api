import { Request, Response } from "express";
import { allShows, createShow, showDetails } from "../services/show.service";

export async function createShowHandler(req:Request,res:Response) {
    try {
        const show = await createShow(req.body)
        return res.send(show)
    } catch (error) {
        console.log(error)
    }
}

export async function seeAllShows(req:Request,res:Response) {
    try {
        const show = await allShows()
        return res.send(show)
    } catch (error) {
        console.log(error)
    }
}

export async function seeShowDetailsHandler(req:any,res:Response) {
    try {
        const {screen } = req.params
        const show = await showDetails(screen)
        return res.send(show)
    } catch (error) {
        console.log(error)
    }
}