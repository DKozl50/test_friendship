import RoundButton from '../RoundButton/RoundButton';
import './QuizButton.css'
import Emoji from "../Emoji/Emoji";

/**
 * React component with an answer (text and emoji)
 * Used when user is taking a test
 * @param {string} text - text of an answer
 * @param {string} icon - url of answer's current emoji
 * @param {(answer_id : number) => void} answer_changed - Handler of this event:
 *  user selected this answer as a correct one for the current question
 */
export default function QuizButton({text, icon, answer_changed}){
    return (
        <div className="quiz-button">
            <RoundButton onClick={answer_changed}>
                <Emoji size={40} src={icon}/>
            </RoundButton>
            {text}
        </div>
    );
}
