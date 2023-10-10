import QuizButton from "../QuizButton/QuizButton";
import './QuizAnswers.css'
/**
 * React component displaying answer choices for the current question
 * (used when a user is taking a test)
 * @param {Array[answer]} answers - array of answers for the current question
 * @param {(answer_id : number, is_left : boolean) => void} answer_changed -
 *  Handler of this event:
 *  user has selected an answer for the current question
 */
export default function QuizAnswers({answers, ans_selected}) {
    return (
        <div className="quiz-answers">
            {/* iterating over answers for the current question */}
            {answers.map((ans, ans_index) => {
                //finding out if it's left or right answer
                let is_left = true
                if (ans_index !== 0) is_left = false

                return (<QuizButton
                    text={ans.text}
                    icon={ans.icon}
                    key={ans.id}
                    answer_changed={() => ans_selected(ans.id, is_left)}
                />)
            })}
        </div>
    );
}