// Module imports
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const fs = require('fs')
const rateLimit = require("express-rate-limit")
const OpenApiValidator = require('express-openapi-validator');
const TelegramBot = require('node-telegram-bot-api');

// App configuration
const app = express()
dotenv.config()
const port = process.env.PORT || 3000

app.use(cors())
app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)
app.use(
    OpenApiValidator.middleware({
        apiSpec: './openapi.yaml',
        validateRequests: true, // (default)
        validateResponses: false, // false by default
    }),
);

const limiter = rateLimit({
    windowMs: 20 * 1000, // 20 seconds
    max: 10 // limit each IP to 5 requests per windowMs
})
app.use(limiter)

// Route imports
const usersRouter = require('./src/routes/users.route')
const testsRouter = require('./src/routes/tests.route')
const {botListen} = require('./src/bot');

// Route activations
app.use('/users', usersRouter)
app.use('/tests', testsRouter)

// Error handler middleware
app.use((err, req, res, next) => {
    // format error
    res.status(err.status || 500).json({
        message: err.message,
        errors: err.errors,
    });
});

// Database starts
const url = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:27017/${process.env.DATABASE}?authSource=admin&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&directConnection=true&ssl=false`
mongoose.connect(
    url,
    {useNewUrlParser: true, useUnifiedTopology: true }
)

const db = mongoose.connection
db.once('open', _ => {
    console.log('Database connected: ', url)
})

db.on('error', err => {
    console.error('connection error: ', url)
})

// Telegram bot
botListen()

// App starts
if (process.env.HOST === "localhost") {
    app.listen(port, () => {
        console.log(`App starts at http://${process.env.HOST}:${port}`)
    })
} else {
    const options = {
        key: fs.readFileSync('/etc/letsencrypt/live/pipeweb.ru/privkey.pem'),
        cert: fs.readFileSync('/etc/letsencrypt/live/pipeweb.ru/fullchain.pem')
    }
    const https = require('https').createServer(options, app)
    https.listen(port, () => {
        console.log(`App starts at https://${process.env.HOST}:${port}`)
    })
}
