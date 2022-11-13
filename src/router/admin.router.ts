import express from 'express';
import {
  createShowHandler,
  deleteShowHandler,
  seeAllShows,
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

Router.get('/ping-check', (req, res) => {
  res.send('working');
});

//Get all shows
Router.get('/shows', requiresUser, authorizePermissions('admin'), seeAllShows);

//get shows with according to screen number
Router.get(
  '/:screen/show',
  validateRequest(showDetailsSchema),
  requiresUser,
  authorizePermissions('admin'),
  seeShowDetailsHandler
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
