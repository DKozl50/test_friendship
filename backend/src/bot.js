const TelegramBot = require("node-telegram-bot-api");

const bot = new TelegramBot(process.env.BOT_TOKEN, {polling: true});

/**
 * Listens for incoming messages from the Telegram bot API 
 * and sends an app link to the user when they type /start
 *
 * @function
 * @name botListen
 * @returns {void}
 */
function botListen() {
    bot.on('message', async (msg) => {
        const chatId = msg.chat.id;
        const text = msg.text
        if (text === "/start") {
            await bot.sendMessage(chatId, 'Hello\n\nClick below to open the app', {
                reply_markup: {
                    inline_keyboard: [
                        [{text: "Launch app", web_app: {url: process.env.APP_URL}}]
                    ]
                }
            })
        }
    });
}

/**
 * Sends a notification message to a Telegram user with a link to the app.
 * This function does not throw an error if user has blocked the bot.
 *
 * @async
 * @function
 * @name sendNotification
 * @param {number} chatId - The ID of the Telegram chat to send the message to.
 * @param {string} userName - The name of the user who finished the test.
 * @returns {Promise<void>}
 * @throws {Error} If the message fails to send.
 */
async function sendNotification(chatId, userName) {
    await bot.sendMessage(chatId, userName + ' has finished your test!\nLook at their results:', {
        reply_markup: {
            inline_keyboard: [
                [{text: "Launch app", web_app: {url: process.env.APP_URL}}]
            ]
        }
    }).catch((error) => {
        const error_code = error.response.body.error_code
        if (error_code === 403 || error_code === 400) return
        throw error
    });
    
}

exports.bot = bot
exports.botListen = botListen
exports.sendNotification = sendNotification