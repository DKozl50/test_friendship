/**
 * @typedef {Object} userAnswer
 * @property {number} question_id - a question id
 * @property {number} answer_id - user's answer id for the current question
 */

/**
 * @typedef {Object} checkResult
 * @property {number} question_id - a question's id
 * @property {number} answer_id - user's answer id for the current question
 * @property {boolean} is_correct - true if user's answer fot the question is correct
 * false otherwise
 */

/**
 * @typedef {Object} answer
 * @property {number} id - an answer's id
 * @property {string} text - answer's text
 * @property {string} icon - url of answers's emoji
 * false otherwise
 */

/**
 * @typedef {Object} question
 * @property {number} id - a question id
 * @property {string} text - question's text
 * @property {string} question_type - question's type(for futher developing)
 * @property {Array[answer]} answers - question's answers
 * false otherwise
 */

/**
 * Function to get total score of the attempt by test results
 * @param {Array[checkResult]} check_results - array of test results
 * @returns {number} - total score of the attempt
 */
export function get_score(check_results) {
    let score = 0;
    for (let i = 0; i < check_results.length; i++) {
        if (check_results[i].is_correct)
            score++;
    }
    return score
}

/**
 * Function to get question's index in array of questions
 *  by it's id
 * @param {number} id - needed questions's id
 * @param {Array[question]} questions - array of questions
 * @returns {number} - needed question's index in array of questions
 */
export function get_question_index_by_id(id, questions) {
    for (let i = 0; i < questions.length; i++) {
        if (questions[i].id === id)
            return i
    }
    return -1
}


/**
 * Function to check user's answers for a test results
 * @param {Array[userAnswer]} answers - array of user's answers
 * @param {Array[question]} questions - array of questions(with correct answers)
 * @returns {Array[checkResult]} - results of checking user's answers for the test
 */
export function get_check_results_array(answers, questions) {
    const check_results = []
    for (let i = 0; i < answers.length; i++) {
        const question_index = get_question_index_by_id(answers[i].question_id, questions)
        //checks if the user's answer is correct or not
        let is_correct = false;
        if (questions[question_index].correct_answer_id === answers[i].answer_id)
            is_correct = true
        check_results.push({
            question_id: answers[i].question_id,
            answer_id: answers[i].answer_id,
            is_correct: is_correct
        })
    }
    return check_results
}

export function get_answer_index_by_id(question_index, id, questions) {
    for (let i = 0; i < questions[question_index].answers.length; i++) {
        if (questions[question_index].answers[i].id === id)
            return i
    }
    return -1
}
