# Frienship Test
Put your friendships to the test! Create a quiz about your preferences, share it with your friends, and find out how well they know you. Strengthen your bonds as you discover who's on the same wavelength. Play now!

Try it out: https://t.me/friendship_testing_bot

## About this app
Friendship Test is a simple Telegram Mini App, in it's source code developers can find sharing, working with direct links to content in app, multipages, forms, navigation in mini app format, modal windows, data storage in a database, API and interaction with a Telegram bot. 

## Stack
We tried to implement the project with minimal use of third-party packages. All components and styles are written by us except the carousel and icons.

 - Node (Web server)
 - Express (Web server framework)
 - node-telegram-bot-api (Package for interactions with Telegram Bot API)
 - express-rate-limit (Package for rate control to limit repeated requests)
 - express-openapi-validator (Package for automatic validation of API requests and responses using an OpenAPI 3 specification) 
 - MongoDB (database)
 - React (Frontend framework)
 - @vkontakte/icons (Package with svg icons as react components) 
 - react-responsive-carousel (Carousel component for react)

## Setup
You need to have [Node.js](https://nodejs.org/) and [MongoDB](https://www.mongodb.com/) installed.
Clone this repository or download zip file.

### Frontend
 1. Open frontend folder 
 2. Install dependencies: `npm install`
 3. Run the app: `npm start`
 4. App should be ready on port "3006"

### Backend
 - Open backend folder
 - Copy `.example.env` to `.env` and fill it properly (see configuration)
 - Install dependencies: `npm install`
 - Run the app: `node index.js`
 - App should be ready on port from `.env` file

### Configuration
For the minimal configuration, the following settings need to be changed in the `.env`-file:
 - `PORT` - port where backend will be run
 - `HOST` - ip address or domain (write `localhost` if you run it locally, otherwise make sure you have SSL certificates for HTTPS connection)
 - `DB_HOST` - mongodb host 
 - `DB_USER` - mongodb user
 - `DB_PASSWORD` - mongodb password for user
 - `DATABASE` - the database name
 - `BOT_TOKEN` - your Telegram bot token
 - `APP_URL` - your Telegram Mini App URL

## Documentation
Our code is completely documented so you can easily figure it out. The api is fully described in `openapi.yaml` file, you can also view it [here](https://pipeweb.ru:3000/static/openapi_doc.html) (created with Redoc).

 - Backend documentation can be found in BACKEND.md
