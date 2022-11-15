# Theater-booking-api
This is an api which allows user to book-tickets in a Theater using express-typescript and mongodb

# Install, Configure & Run

Below mentioned are the steps to install, configure & run in your platform/distributions.

```bash
# Clone the repo.
git clone https://github.com/raunakgurud09/Theater-booking-api.git;

# Goto the cloned project folder.
cd Theater-booking-api;
```
 Note: It is assumed here that you have MongoDB running in the background and that you have created the database or use mongoAtlas.

 to add your mongoAtlas url go to src/configs/index.config.ts 
 1. add your mongoAtlas url 

```bash

# Install NPM dependencies.
# Note: You can review the list of dependencies from the below link.
npm install; 

# Run the app in development mode
npm run devStart; 
```
# API routes

BASEURL = http://localhost:3000/api/v1/

- GET       /ping-check         Check weather the api in working
- POST      /user               To register a user
- POST      /sessions           get user login by creating a new session
- DELETE    /sessions           Logout user from the session

As a user you can view 
- GET       /shows              View all the show which are available
- GET       /:screen/shows      View show according to screen number, mention the screen number (EX - 1 | 2)
- GET       /show/:showId       View information for a specific show, mention the showId = _id get this from /shows or /:screen/shows

Login user to view
- POST      /:screen/show/:showId/book?seat=89      Book Ticket for user, mention the :showId and seat = seat you want (the seat number should be less than 100)
- DELETE    /:screen/show/:showId/cancel?seat=89    Cancel Ticket for user, mention the :showId and seat = seat you don't want

- GET       /get-ticket         Get all the tickets for a user


Login as a ADMIN 
Get info for the shows created
- GET       /:screen/shows      View show according to screen number, mention the screen number (EX - 1 | 2)
- GET       /show/:showId       View information for a specific show, mention the showId = _id get this from /shows or /:screen/shows

to create | update | delete show
- POST      /show/:showId       Create a show 
- PATCH     /show/:showId       update a show 
- DELETE    /show/:showId       Delete a show 


## To use API
preferable use POSTMAN for checking all the routes 

import theater-booking-api.postman_collection.json  in you POSTMAN 
