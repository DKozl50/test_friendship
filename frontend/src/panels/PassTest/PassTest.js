import {useState, useEffect} from "react";
import QuizCard from "../../components/QuizCard/QuizCard";
import React from "react";
import QuizAnswers from "../../components/QuizAnswers/QuizAnswers";
import {get_questions, send_answers} from "../../api";
import {useTestContext} from "../../contexts/TestContext/TestContextProvider";
import {useNavigationContext} from "../../contexts/NavigationContext/NavigationContextProvider";
import ScreenSpinner from "../../components/ScreenSpinner/ScreenSpinner";
import colors from "../../data/colors.json"
import "./PassTest.css"

/**
 * React component with a taking a test panel
 */

export default function PassTest() {
    //id of the current question
    const [currentQuestion, setCurrentQuestion] = useState(0)
    //array of questions's cards CSS classes (used for animation)
    const [questionAnimation, setQuestionAnimation] = useState([])
    //flag which shows if test if finished or not
    const [testFinished, setTestFinished] = useState(false)
    //information about the current test
    const {
        testIdForPassing, setTestIdForPassing, questions,
        setQuestions, user_answers, setUserAnswers, setResults,
        ownerName, setOwnerName
    } = useTestContext()
    //function which changes an active panel (used for navigation)
    const {changeActivePanel} = useNavigationContext()

    useEffect(() => {
        /**
         * Function used for getting information about the current test 
         */
        async function fetchData() {
            const res = await get_questions(testIdForPassing)
            console.log(res)
            if (res === undefined) {
                setTestIdForPassing(0);
                return;
            }
            setOwnerName(res.name)
            setQuestions(res.questions)
            // setting initial CSS classes for questions's cards
            const newQuestionAnimation = new Array(res.questions.length).fill('')
            newQuestionAnimation[0] = 'quiz-get-big '
            newQuestionAnimation[res.questions.length - 1] = 'quiz-question-card-shadow '
            setQuestionAnimation(newQuestionAnimation)
        }

        setUserAnswers([])
        fetchData()
    }, [])

    /**
     * Function which switches the current question to a next one
     */
    function go_next() {
        if (currentQuestion < questions.length - 1)
            setCurrentQuestion(currentQuestion + 1)
        else finishTest()
    }
    /**
     * Function which handles user selecting an answer event
     * @param {number} answer_id - Id of the selected answer 
     * @param {boolean} is_left - Flag which indicates if
     *  the selected answer is left or right(used for animation)
     */
    async function ans_selected(answer_id, is_left) {
        //update user's answers array
        user_answers.push({
            question_id: questions[currentQuestion].id,
            answer_id: answer_id
        })
        setUserAnswers(user_answers.slice(0))
        //perform animation
        if (is_left) {
            questionAnimation[currentQuestion] = 'quiz-swipe-left '
        } else {
            questionAnimation[currentQuestion] = 'quiz-swipe-right '
        }
        setQuestionAnimation(questionAnimation.slice(0))
        go_next()
        setTimeout(() => {
            questionAnimation[currentQuestion + 1] = 'quiz-get-big '
            setQuestionAnimation(questionAnimation.slice(0))
        }, 200)
    }

    /**
     * Function which is called when the test is finished
     */
    async function finishTest() {
        //update test is finished or not flag
        setTestFinished(true)
        //call api method sending user's answers
        const res = await send_answers(testIdForPassing, user_answers)
        if (res === undefined) {
            setTestIdForPassing(0);
            return;
        }
        //update results of the attempt array
        setResults(res.result)
        //show results
        changeActivePanel('testResults')
    }

    return (
        <div style={{overflowX: "hidden"}}>
            {testFinished || questions.length === 0
                ?
                <ScreenSpinner/>
                :
                <>
                    <section className="quiz-question-section">
                        <div className="quiz-questions-wrapper">
                            {questions.map((question, ind) => (
                                <QuizCard
                                    key={question.id}
                                    animation={questionAnimation[ind]}
                                    text={question.text}
                                    name={ownerName}
                                    answers={question['answers']}
                                    background={colors[ind % 10]}
                                />
                            ))}
                        </div>
                    </section>
                    <QuizAnswers
                        answers={questions[currentQuestion]['answers']}
                        ans_selected={ans_selected}></QuizAnswers
                    >
                </>
            }
        </div>
    );
}