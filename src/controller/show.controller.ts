import { Request, Response } from 'express';
import {
  allShows,
  createShow,
  deleteShow,
  showDetails,
  updateShow
} from '../services/show.service';
import { get } from 'lodash';
import { Show } from '../model/show.model';

export async function createShowHandler(req: Request, res: Response) {
  try {
    const show = await createShow(req.body);
    return res.send(show);
  } catch (error) {
    console.log(error);
  }
}

export async function updateShowHandler(req: Request, res: Response) {
  try {
    const { showId } = get(req, 'params');
    const update = get(req, 'body');
    const show = await updateShow({ showId }, { update });
    return res.send(show);
  } catch (error) {
    console.log(error);
  }
}
export async function deleteShowHandler(req: Request, res: Response) {
  try {
    const { showId } = get(req, 'params');
    const show = await deleteShow({ showId });
    return res.send(show);
  } catch (error) {
    console.log(error);
  }
}

export async function seeAllShows(req: Request, res: Response) {
  try {
    const show = await allShows();
    return res.send(show);
  } catch (error) {
    console.log(error);
  }
}

export async function seeShowDetailsHandler(req: Request, res: Response) {
  try {
    const { showId } = get(req, 'params');
    const show = await showDetails(  showId );
    return res.send(show);
  } catch (error) {
    console.log(error);
  }
}

export async function seeScreenDetailsHandler(req: Request, res: Response) {
  try {
    const { screen } = get(req, 'params');
    const show = await Show.find({ screenNumber: screen });
    return res.send(show);
  } catch (error) {
    console.log(error);
  }
}

