import {useState, useEffect} from "react";
import Answers from "../../components/AnswersBlock/Answers";
import base_questions from '../../data/base_questions.json'
import {create_test} from '../../api'
import Modal from "../../components/Modal/Modal";
import RoundButton from "../../components/RoundButton/RoundButton";
import {
    Icon28ArrowLeftOutline,
    Icon28ArrowRightOutline,
    Icon28DoneOutline,
} from "@vkontakte/icons";
import "./CreateTest.css"
import QuestionCard from "../../components/QuestionCard/QuestionCard";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import {Carousel} from 'react-responsive-carousel';
import Spinner from "../../components/Spinner/Spinner";
import { useTestContext } from "../../contexts/TestContext/TestContextProvider";
import { useNavigationContext } from "../../contexts/NavigationContext/NavigationContextProvider";
import { get_name } from "../../utils/telegram.utils";
import {get_answer_index_by_id} from "../../utils/test.utils";
import colors from '../../data/colors.json'

/**
 * React component with a creating test panel
 */
export default function CreateTest() {
    //currect question's id
    const [cur_question, setCurQuestion] = useState(0)
    //flag which indicates if modal is showed or not
    const [show_modal, setShowModal] = useState(false)
    //CSS classes for modal window(used for animation)
    const [modal_animation, setModalAnimation] = useState('slide-in')
    //id of the answer for which the modal window is opened now
    const [modalAnswerId, setModalAnswerId] = useState(-1)
    //flag which indicates if user is waiting for a test to create
    //(waiting for an api request)
    const [isCreatingTest, setIsCreatingTest] = useState(false)
    //information about the test
    const {questions, setQuestions, setTestId} = useTestContext()
    //function which chanhes an active panel (used for navigation)
    const {changeActivePanel} = useNavigationContext()
    //user's name
    const name = get_name()

    useEffect(() => {
        setQuestions(base_questions)
    }, [])
    /**
     * Function which handles user changing the correct answer event
     * @param {number} answerId - Id of the selected answer
     */
    function ans_selected(answerId) {
        questions[cur_question]['correct_answer_id'] = answerId
        setQuestions(questions.slice(0))
    }

    /**
     * Function which handles user changing the answer's text
     * @param {number} answerId - Id of the answer
     * @param {string} new_value - new text of the answer
     */
    function change_question_answer_text(answerId, new_value) {
        const answerIndex = get_answer_index_by_id(cur_question, answerId, questions)
        questions[cur_question]['answers'][answerIndex]['text'] = new_value
        setQuestions(questions.slice(0))
    }

    /**
     * Function which handles user changing the answer's emoji
     * @param {number} answerId - Id of the answer
     * @param {string} new_value - new url of the emoji
     */
    function new_icon_chosen(answerId, new_value) {
        const answerIndex = get_answer_index_by_id(cur_question, answerId, questions)
        questions[cur_question]['answers'][answerIndex]['icon'] = new_value
        setQuestions(questions.slice(0))
        close_modal()
    }

    /**
     * Function which handles user switching an active question
     * to the previous one
     */
    function go_prev() {
        if (cur_question !== 0) {
            setCurQuestion(cur_question - 1)
        }
    }

    /**
     * Function which handles user switching an active question
     * to the next one
     */
    async function go_next() {
        if (cur_question < questions.length - 1) {
            setCurQuestion(cur_question + 1)
        } else await done_request()
    }
    
    /**
     * Function which handles user pressing a button to 
     * finish creating a test 
     */
    async function done_request() {
        setIsCreatingTest(true)
        const res = await create_test(questions)
        if(res === undefined)
            return
        setTestId(res.test.id)
        changeActivePanel('shareTest')
        setIsCreatingTest(false)
    }
    /**
     * Function which opens a modal
     * @param {number} answerId - Id of the answer
     * the modal is opening for
     */
    function open_modal(answerId) {
        setModalAnswerId(answerId)
        setModalAnimation('slide-in')
        setShowModal(true)
    }
    /**
     * Function which closes a modal
     * 
     */
    async function close_modal() {
        setModalAnimation('slide-out')
        setTimeout(() => setShowModal(false), 350)
    }
    /**
     * Function which returns an icon for the right button
     * @returns {JSX.Element} - icon component
     */
    function getRightButtonIcon() {
        if (isCreatingTest) {
            return <Spinner size={28}/>
        } else if (cur_question === questions.length - 1) {
            return <Icon28DoneOutline/>
        } else {
            return <Icon28ArrowRightOutline/>
        }
    }
    return (
        <div>
            {show_modal === true &&
                <Modal 
                    animation={modal_animation} 
                    newIcon={new_icon_chosen} 
                    answerId={modalAnswerId}
                    closeModal={close_modal}
                />
            }
            <div className={"carousel-container"}>
                <Carousel
                    emulateTouch={true}
                    showArrows={false}
                    showStatus={false}
                    showIndicators={false}
                    infiniteLoop={false}
                    showThumbs={false}
                    selectedItem={cur_question}
                    centerMode={true}
                    centerSlidePercentage={100}
                    onChange={(index) => setCurQuestion(index)}
                >
                    {
                        questions.map((question, index) => (
                            <div className="slide__in" key={index}>
                                <QuestionCard
                                    background={colors[index % 10]}
                                    key={index}
                                    text={question.text.replace('$name', name) + "? " +
                                        question["answers"][0].text + " or " + question["answers"][1].text + "?"}
                                />
                            </div>

                        ))
                    }
                </Carousel>
            </div>

            {questions.length > 0 &&
                <Answers
                    open_modal={open_modal}
                    answers={questions[cur_question]['answers']}
                    answer_changed={ans_selected}
                    change_question_answer_text={change_question_answer_text}
                    correct_answer_id={questions[cur_question]['correct_answer_id']}
                />
            }

            <div className="navigation-container">
                <RoundButton onClick={go_prev} disabled={cur_question === 0}>
                    <Icon28ArrowLeftOutline/>
                </RoundButton>
                <RoundButton onClick={go_next}>
                    {getRightButtonIcon()}
                </RoundButton>
            </div>
        </div>
    );
}