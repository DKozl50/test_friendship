const Test = require("../models/test.model")
const User = require("../models/user.model")
const {verifyTelegramWebAppData, getUserTgId} = require("../utils/utils");
const {sendNotification} = require("../bot");

/**
 * Creates a new test.
 *
 * @description This function creates a new test for a user. The user must be authorized 
 * using a Telegram Web App data token in the `Authorization` header of the HTTP request. 
 * The test data is provided in the request body as a JSON object with a `questions` property 
 * that contains an array of test questions. Refer to OpenAPI schema for details.
 * The function creates a new `Test` document in the database and associates it 
 * with the user by adding the `Test` document ID to the `test_ids` array of the user document. 
 * If the user has already created a test, the function returns a `403` error.
 *
 * @function
 * @async
 * @param {Object} req - The HTTP request object.
 * @param {Object} req.headers.authorization - The authorization token.
 * @param {Object} req.body - The test data.
 * @param {Array} req.body.questions - The test questions.
 * @param {Object} res - The HTTP response object.
 * @returns {Object} The newly created test.
 * @throws {Error} If the user is not authorized or has already created a test.
 */
exports.createTest = async (req, res) => {
    const initData = req.headers.authorization
    if (!verifyTelegramWebAppData(initData)) {
        res.status(401);
        return res.json({message: "Not authorized"})
    }
    const tg_id = getUserTgId(initData)
    const user = await User.findOne({tg_id: tg_id}, ["test_ids"])
    if (user.test_ids.length > 0) {
        res.status(403)
        return res.json({message: "Test already created"})
    }

    const data = {
        owner_tg_id: tg_id,
        questions: req.body.questions
    }

    const new_test = new Test(data)
    await new_test.save()
    await User.updateOne(
        {tg_id: tg_id},
        {$push: {test_ids: new_test.id}}
    )

    return res.json({test: new_test})
}

/**
 * Registers an answer and returns results.
 *
 * @description This function registers an answer and returns results. 
 * The user must be authorized using a Telegram Web App data token 
 * in the `Authorization` header of the HTTP request. 
 * The test ID is provided in the request body as a JSON object with a `test_id` property. 
 * The function retrieves the `Test` document from the database and sends a notification 
 * to the test owner with the name of the user who passed the test. 
 * The function returns an array of test results.
 *
 * @function
 * @async
 * @param {Object} req - The HTTP request object.
 * @param {Object} req.headers.authorization - The authorization token.
 * @param {Object} req.body - The test ID.
 * @param {string} req.body.test_id - The ID of the test.
 * @param {Object} res - The HTTP response object.
 * @returns {Array} The test results.
 * @throws {Error} If the user is not authorized or the test is not found.
 */
exports.sendAnswer = async (req, res) => {
    const initData = req.headers.authorization
    if (!verifyTelegramWebAppData(initData)) {
        res.status(401);
        return res.json({message: "Not authorized"})
    }
    const tg_id = getUserTgId(initData)

    const test = await Test.findOne({id: req.body.test_id})
    const passer = await User.findOne({tg_id: tg_id})
    if (!test) {
        res.status(404)
        return res.json({message: "Test not found"})
    }
    await sendNotification(test.owner_tg_id, passer.name)
    let result = []

    for (let guess of req.body.guesses) {
        const correct_answer_id = test.questions.find((question) => question.id === guess.question_id).correct_answer_id
        result.push({
            question_id: guess.question_id,
            is_correct: guess.answer_id === correct_answer_id
        })
    }

    await Test.updateOne(
        {id: req.body.test_id},
        {
            $push: {
                results: {
                    "user_tg_id": tg_id,
                    "guesses": req.body.guesses
                }
            }
        }
    )

    return res.json({result: result})
}

/**
 * Gets a test by ID.
 *
 * @description This function retrieves a test by its ID. The user must be authorized 
 * using a Telegram Web App data token in the `Authorization` header of the HTTP request. 
 * The test ID is provided in the URL path.
 * The function retrieves the `Test` document from the database and returns it as a JSON object.
 * If the user is not the owner of the test, the function returns a `403` error.
 *
 * @function
 * @async
 * @param {Object} req - The HTTP request object.
 * @param {Object} req.headers.authorization - The authorization token.
 * @param {Object} req.params - The URL parameters.
 * @param {string} req.params.test_id - The ID of the test.
 * @param {Object} res - The HTTP response object.
 * @returns {Object} The test data.
 * @throws {Error} If the user is not authorized or the test is not found.
 */
exports.getTest = async (req, res) => {
    const initData = req.headers.authorization
    if (!verifyTelegramWebAppData(initData)) {
        res.status(401);
        return res.json({message: "Not authorized"})
    }
    const tg_id = getUserTgId(initData)

    const test = await Test.findOne({id: req.params.test_id})
    if (!test) {
        res.status(404)
        return res.json({message: "Test not found"})
    }
    if (test.owner_tg_id !== tg_id) {
        res.status(403)
        return res.json({message: "Permission denied"})
    }
    for (let result of test.results) {
        const user = await User.findOne({"tg_id": result.user_tg_id}, ["name"])
        result.user_name = user.name
    }
    return res.json({test: test})
}

/**
 * Gets the questions for a test.
 *
 * @description This function retrieves the questions for a test. 
 * The user must be authorized using a Telegram Web App data token 
 * in the `Authorization` header of the HTTP request. 
 * The test ID is provided in the URL path. 
 * The function retrieves the `Test` document from the database 
 * and returns an array of question objects.
 * If the user is the owner of the test or has already taken the test, 
 * the function returns a `403` error.
 *
 * @function
 * @async
 * @param {Object} req - The HTTP request object.
 * @param {Object} req.headers.authorization - The authorization token.
 * @param {Object} req.params - The URL parameters.
 * @param {string} req.params.test_id - The ID of the test.
 * @param {Object} res - The HTTP response object.
 * @returns {Array} The test questions.
 * @throws {Error} If the user is not authorized or the test is not found.
 */
exports.getQuestions = async (req, res) => {
    const initData = req.headers.authorization
    if (!verifyTelegramWebAppData(initData)) {
        res.status(401);
        return res.json({message: "Not authorized"})
    }
    const tg_id = getUserTgId(initData)

    const test = await Test.findOne(
        {id: req.params.test_id},
        ["questions", "owner_tg_id", "results"]
    )

    if (!test) {
        res.status(404)
        return res.json({message: "Test not found"})
    }

    if (test.owner_tg_id === tg_id) {
        res.status(403)
        return res.json({message: "Forbidden to take your own test"})
    }

    for (let result of test.results) {
        if (result.user_tg_id === tg_id) {
            res.status(403)
            return res.json({message: "Forbidden to take the test twice"})
        }
    }

    const user = await User.findOne({tg_id: test.owner_tg_id}, ["name"])

    for (let i = 0; i < test.questions.length; i++) {
        delete test.questions[i].correct_answer_id
    }
    return res.json({questions: test.questions, name: user.name})
}

/**
 * Deletes a test by ID.
 *
 * @description This function deletes a test by its ID. The user must be authorized 
 * using a Telegram Web App data token in the `Authorization` header of the HTTP request. 
 * The test ID is provided in the URL path. 
 * The function deletes the `Test` document from the database and returns a success message.
 * If the user is not the owner of the test, the function returns a `403` error.
 *
 * @function
 * @async
 * @param {Object} req - The HTTP request object.
 * @param {Object} req.headers.authorization - The authorization token.
 * @param {Object} req.params - The URL parameters.
 * @param {string} req.params.test_id - The ID of the test.
 * @param {Object} res - The HTTP response object.
 * @returns {Object} A success message.
 * @throws {Error} If the user is not authorized or the test is not found.
 */
exports.deleteTest = async (req, res) => {
    const initData = req.headers.authorization
    if (!verifyTelegramWebAppData(initData)) {
        res.status(401);
        return res.json({message: "Not authorized"})
    }
    const tg_id = getUserTgId(initData)

    const test = await Test.findOne({id: req.body.test_id}, ["owner_tg_id"])
    if (!test) {
        res.status(404)
        return res.json({message: "Test not found"})
    }

    if (test.owner_tg_id !== tg_id) {
        res.status(400)
        return res.json({message: "permission denied"})
    }

    await Test.deleteOne({id: req.body.test_id})
    await User.updateOne(
        {tg_id: tg_id},
        {$pull: {test_ids: req.body.test_id}}
    )
    return res.json({success: true});
}
