const User = require("../models/user.model")
const {verifyTelegramWebAppData, getUserTgId, getUserName} = require("../utils/utils");

/**
 * Initializes a user.
 *
 * @description This function initializes or looks up a user in the database. 
 * The user must be authorized using a Telegram Web App data token 
 * in the `Authorization` header of the HTTP request.
 * The function retrieves the user's Telegram ID and name from the token 
 * and creates a new `User` document in the database if one does not already exist. 
 * The function returns the `User` document and a boolean value indicating 
 * whether the user is new or not.
 *
 * @function
 * @async
 * @param {Object} req - The HTTP request object.
 * @param {Object} req.headers.authorization - The authorization token.
 * @param {Object} res - The HTTP response object.
 * @returns {Object} The `User` document and a boolean value indicating whether the user is new or not.
 * @throws {Error} If the user is not authorized.
 */
exports.init = async (req, res) => {
    const initData = req.headers.authorization
    if (!verifyTelegramWebAppData(initData)) {
        res.status(401);
        return res.json({message: "not authorized"})
    }
    const tg_id = getUserTgId(initData)
    const name = getUserName(initData)

    const user = await User.findOne({"tg_id": tg_id})
    if (!user) {
        const data = {
            tg_id: tg_id,
            name: name
        }
        const new_user = new User(data)
        await new_user.save()
        return res.json({user: new_user, is_new_user: true})
    }

    if (name !== user.name) {
        user.name = name
        await user.save()
    }

    return res.json({user: user, is_new_user: false})
}

