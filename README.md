[![Waffle.io - Columns and their card count](https://badge.waffle.io/hrandersons/cuisinely.png?columns=all)](https://waffle.io/hrandersons/cuisinely?utm_source=badge)
# iFeedMe #

## Description ##

> Our app makes home cooking fun and stress-free by providing recipe bookmarking, meal planning, and even grocery list generation at the touch of a button.  Users earn points for every meal completed, gaining new levels and titles as they work toward becoming master chefs!

## Team ##
__Product Owner__: Lillian Lee
__Scrum Master__: Doug Salazar
__Development Team Members__: Bois Bakhodirov, Jacob Yoo

## Requirements ##
- Node 6.10.3 and above
- MongoDB latest
- See Getting Started for API keys
- See package.json for dependencies

## Usage ##
1. Install node.js and mongodb.  From the root directory:
1. `Npm install`
1. Get all API keys (see Getting Started)
1. Start MongoDB
1. `Npm start`
1. `Npm run dev-client` (development only)
1. Seed database by running `node db/seedDB.js` in terminal

## Getting Started ##
For authentication, you will need to create an Auth0 instance for your application.  Sign up for free here: https://auth0.com/
Add your clientID key and domain link to the Auth lock in line 4 of Auth/Auth.js

For indexed recipe searching, you will need Algolia API keys.  Sign up for a free trial here:
https://www.algolia.com/users/sign_up
Inside the server directory, create a file called algolia_keys.js in the following format:
module.exports = {
  application_ID: ‘myApplicationID’,
  adminAPI_key: 'MY_ADMIN_API_KEY',
};

For image hosting for user-submitted recipes, you will need Cloudinary API Keys. Sign up for free here:
https://cloudinary.com/
Inside the server directory, create a file called cloudinary_keys.js in the following format:
module.exports = {
  cloud_name: ‘cloud name’,
  api_key: 'API_KEY',
  api_secret: 'API_SECRET'
};

For google maps integration in the shopping list view, you will need Google Maps API Keys.  Sign up for free here:
https://developers.google.com/maps/
Add the unique google maps URL containing your key to line 13 of the Map component in map.js

## Project RoadMap ##
https://waffle.io/hrandersons/cuisinely
