import "./AnswerForm.css"
import Emoji from "../Emoji/Emoji";
/**
 * React component with an answer editing interface for the creating a test panel.
 * @param {boolean} checked - Defines is this answer is chosen or not
 * @param {number} answer_id - Id of the current answer
 * @param {string} text - Text of the current answer
 * @param {string} icon - Url of the current answer's emoji
 * @param {(answer_id : number) => void} answer_changed - Handler of this event:
 *  user choose this answer as correct
 * @param {(answer_id : number, new_value : string) => void} change_question_answer_text -
 * Handler of canging the current answer's text
 * @param {(answer_id : number) => void} open_modal - function which opens the modal window
 * where user can choose a new emoji for this answer
 */
export default function AnswerForm({
                                   checked,
                                   answer_id,
                                   text,
                                   icon,
                                   answer_changed,
                                   change_question_answer_text,
                                   open_modal
                               }) {

    return (
        <div className={"answer"}>
            <input
                checked={checked} type="radio"
                onChange={(e) => {
                    answer_changed(answer_id)
                }}
                className="answer__checkbox"
                name="answer"
            />
            <div className="answer__img" onClick={() => open_modal(answer_id)}>
                <Emoji size={40} src={icon}/>
            </div>
            <input
                className="answer__input"
                maxLength="20"
                value={text}
                onChange={(e) => {
                    change_question_answer_text(answer_id, e.target.value)
                }}
            />
        </div>
    );
}

