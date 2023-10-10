import config from './data/config.json'
import {show_error_popup} from './utils/telegram.utils';

const params = new URLSearchParams(window.location.hash.slice(1));
const initDataString = params.get('tgWebAppData');

/**
 * Function which performs an api request
 * to create a new test
 * @param {Array[question]} questions - questions for a new test
 */
export async function create_test(questions) {
    const data = {
        questions: questions,
    }

    const response = await fetch('https://' + config["domain"] + '/tests/createTest/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'authorization': initDataString
        },
        body: JSON.stringify(data)
    })
    const result = await response.json()
    if (!response.ok) {
        show_error_popup(result.message)
        return undefined
    }
    return result
}

/**
 * Function which performs an api request
 * to get questions for a test
 * (for user who is taking a test)
 * @param {number} test_id - id of a needed test
 */
export async function get_questions(test_id) {

    const response = await fetch('https://' + config["domain"] + '/tests/getQuestions/' + test_id, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'authorization': initDataString
        },
    })
    const result = await response.json()
    if (!response.ok) {
        show_error_popup(result.message)
        return undefined
    }
    return result
}

/**
 * Function which performs an api request
 * to get information about a test
 * including users' attempts
 * (for a test owner)
 * @param {number} test_id - id of a needed test
 */
export async function get_test(test_id) {

    const response = await fetch('https://' + config["domain"] + '/tests/getTest/' + test_id, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'authorization': initDataString
        },
    })
    const result = await response.json()
    if (!response.ok) {
        show_error_popup(result.message)
        return undefined
    }
    return result
}

/**
 * Function which performs an api request
 * to send answers for a test
 * @param {number} test_id - id of a needed test
 * @param {Array[answer]} answers - user's answers
 */
export async function send_answers(test_id, answers) {
    const data = {
        test_id: +test_id,
        guesses: answers
    }

    const response = await fetch('https://' + config["domain"] + '/tests/sendAnswer/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'authorization': initDataString
        },
        body: JSON.stringify(data)
    })
    const result = await response.json()
    if (!response.ok) {
        show_error_popup(result.message)
        return undefined
    }
    return result
}
/**
 * Function which performs an api request
 * to receive initial information
 */
export async function init() {

    const response = await fetch('https://' + config["domain"] + '/users/init/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'authorization': initDataString
        }
    })
    const result = await response.json()
    if (!response.ok) {
        show_error_popup(result.message)
        return undefined
    }
    return result
}
/**
 * Function which performs an api request
 * to delete a user's test
 * (for user who is owner of a test)
 * @param {number} test_id - id of a needed test
 */
export async function delete_test(test_id) {
    const data = {
        test_id: test_id
    }

    const response = await fetch('https://' + config["domain"] + '/tests/deleteTest/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'authorization': initDataString
        },
        body: JSON.stringify(data)
    })
    const result = await response.json()
    if (!response.ok) {
        show_error_popup(result.message)
        return undefined
    }
    return result
}