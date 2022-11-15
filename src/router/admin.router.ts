import express from 'express';
import {
  createShowHandler,
  deleteShowHandler,
  seeAllShows,
  seeScreenDetailsHandler,
  seeShowDetailsHandler,
  updateShowHandler
} from '../controller/show.controller';
import authorizePermissions from '../middleware/auth.middleware';
import requiresUser from '../middleware/requiresUser.middleware';
import validateRequest from '../middleware/validate.middleware';
import {
  createShowSchema,
  deleteShowSchema,
  updateShowSchema,
  showDetailsSchema
} from '../schema/show.schema';
const Router = express.Router();

//get shows with according to screen number
Router.get(
  '/:screen/shows',
  validateRequest(showDetailsSchema),
  requiresUser,
  authorizePermissions('admin'),
  seeScreenDetailsHandler
);

//create a show
Router.post(
  '/show',
  validateRequest(createShowSchema),
  requiresUser,
  authorizePermissions('admin'),
  createShowHandler
);

//update a show details
//not working
Router.patch(
  '/show/:showId',
  validateRequest(updateShowSchema),
  requiresUser,
  authorizePermissions('admin'),
  updateShowHandler
);

//delete a show
Router.delete(
  '/show/:showId',
  validateRequest(deleteShowSchema),
  requiresUser,
  authorizePermissions('admin'),
  deleteShowHandler
);

//get info of a show
Router.get(
  '/show/:showId',
  requiresUser,
  authorizePermissions('admin'),
  seeShowDetailsHandler
);

export default Router;
