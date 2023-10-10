import "./ResultsAnswer.css"
import {get_answer_index_by_id, get_question_index_by_id} from "../../utils/test.utils";
import {useTestContext} from "../../contexts/TestContext/TestContextProvider";

/**
 * React component which is displayed in test attempt details:
 * it shows if the question is done correct and displays the correct answer
 * @param {checkResult} result - result of checking the atempt(for the question)
 * @param {Object} user_answer_by_question_id - object which stores user's answer by question id
 */
export default function ResultsAnswer({result, user_answer_by_question_id}) {
    //array of questions and name of an owner of the test
    const {questions, ownerName} = useTestContext()
    //get question index by question's id
    const question_index = get_question_index_by_id(result.question_id, questions)
    //get correct answer's index judjing by
    // user's answer and information if it is correct or not
    let correct_answer_index = get_answer_index_by_id(question_index,
        user_answer_by_question_id[result.question_id], questions)
    const is_correct = result.is_correct
    if (!is_correct) {
        correct_answer_index = 1 - correct_answer_index
    }
    
    const answer_string = 'Correct answer: ' + questions[question_index].answers[correct_answer_index].text

    return (
        <div key={result.question_id} className="checked-answer-block">
            <div className={"checked-answer-question"}>
                {questions[question_index].text.replace('$name', ownerName) + '?'}
            </div>
            <div className={"correct-answer " + (is_correct ? 'correct' : 'wrong')}>
                <div className="checked-answer-img">
                    <img
                        height="30px"
                        src={questions[question_index].answers[correct_answer_index].icon}
                        alt={"emoji"}
                    />
                </div>
                <h5>
                    {answer_string}
                </h5>
            </div>
        </div>
    )
}