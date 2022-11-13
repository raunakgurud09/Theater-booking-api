import { DocumentDefinition } from "mongoose"
import {Show, ShowDocument} from "../model/show.model"

export async function allShows(){
    try {
        return await Show.find({})
    } catch (error) {
        console.log(error)
    }
}

export async function createShow(input:DocumentDefinition<ShowDocument>){
    try {
        //check weather their exit a show already
        return await Show.create(input)
    } catch (error) {
        console.log(error)
    }
}

