import {useEffect, useState} from 'react'
import './TestResults.css'
import {useNavigationContext} from '../../contexts/NavigationContext/NavigationContextProvider';
import {useTestContext} from '../../contexts/TestContext/TestContextProvider';
import ButtonXl from '../../components/ButtonXl/ButtonXl';
import ResultsAnswer from "../../components/ResultsAnswer/ResultsAnswer";

/**
 * React component with a panel which displays results of
 * test attempt
 */
export default function TestResults() {
    //count of the questions that a user answered correctly
    const [correctCount, setCorrectCount] = useState(0)
    //inforamtion about the test
    const {questions, results, user_answers} = useTestContext()
    //function which changes an active panel (used for navigation)
    const {changeActivePanel} = useNavigationContext()
    //object which stores user's answer by question id
    const user_answer_by_question_id = {}

    useEffect(() => {
        //update count of the questions
        // that a user answered correctly
        setCorrectCount(0)
        for (let i = 0; i < results.length; i++) {
            if (results[i].is_correct)
                setCorrectCount((c) => c + 1)
        }
    
    }, [results])
    //updating object which stores user's answer by question id
    for (let i = 0; i < user_answers.length; i++) {
        const temp_user_answer = user_answers[i]
        user_answer_by_question_id[temp_user_answer.question_id] = temp_user_answer.answer_id
    }
    /**
     * Function which returns quality of user's attempt
     * <= 2 correct - low
     * <= 7 correct - medium
     * >= 8 correct - high 
     * @returns {string} quality of user's attempt
     */
    function get_quality() {
        if (correctCount <= 2) return "low";
        else if (correctCount < 8) return "medium";
        else return "high";
    }

    return (
        <div className='results-wrapper'>
            <div className="score-panel">
                <div className={"score " + get_quality()}>
                    <div className="score-text">
                        {/* displaying user's score */}
                        {correctCount} / {questions.length}
                    </div>
                </div>
            </div>
            {/* iterating over the results(for each question) */}
            {

                results.map((result, index) =>
                    <ResultsAnswer
                        kaey={index}
                        result={result}
                        user_answer_by_question_id={user_answer_by_question_id}
                    />
                )
            }
            {/* return home button */}
            <ButtonXl stretched onClick={() => changeActivePanel("home")}>
                Home
            </ButtonXl>
        </div>
    )
}