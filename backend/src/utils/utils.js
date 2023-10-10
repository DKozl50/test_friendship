const dotenv = require('dotenv')
const CryptoJS = require("crypto-js");
dotenv.config()

/**
 * Verifies the authenticity of Telegram Web App data 
 * by comparing the provided hash with a calculated hash.
 * https://core.telegram.org/bots/webapps#validating-data-received-via-the-mini-app
 * 
 * @function
 * @name verifyTelegramWebAppData
 * @param {string} telegramInitData - The Telegram Web App data to verify.
 * @returns {boolean} Whether the data is authentic or not.
 */
exports.verifyTelegramWebAppData = (telegramInitData) => {
    const initData = new URLSearchParams(telegramInitData);

    // Get the hash from the Telegram Web App data
    const hash = initData.get("hash");

    // Extract the data to check from the Telegram Web App data
    const dataToCheck = [];
    initData.sort();
    initData.forEach((val, key) => {
        // The hash is not part of the data to check
        if (key !== "hash") {
            dataToCheck.push(`${key}=${val}`);
        }
    });

    // Calculate the secret key using the bot token
    const secret = CryptoJS.HmacSHA256(process.env.BOT_TOKEN, "WebAppData");

    // Calculate the hash using the data to check and the secret key
    const calculatedHash = CryptoJS.HmacSHA256(dataToCheck.join("\n"), secret).toString(CryptoJS.enc.Hex);

    return calculatedHash === hash;
}

/**
 * Extracts the Telegram user ID from the provided Telegram Web App data.
 *
 * @function
 * @name getUserTgId
 * @param {string} telegramInitData - The Telegram Web App data to extract the user ID from.
 * @returns {number} The Telegram user ID.
 */
exports.getUserTgId = (telegramInitData) => {
    const initData = new URLSearchParams(telegramInitData);
    const user = JSON.parse(initData.get("user"))
    return user.id
}

/**
 * Extracts the Telegram username from the provided Telegram Web App data.
 *
 * @function
 * @name getUserTgId
 * @param {string} telegramInitData - The Telegram Web App data to extract the username from.
 * @returns {string} The Telegram username.
 */
exports.getUserName = (telegramInitData) => {
    const initData = new URLSearchParams(telegramInitData);
    const user = JSON.parse(initData.get("user"))
    return user.first_name + " " + user.last_name
}