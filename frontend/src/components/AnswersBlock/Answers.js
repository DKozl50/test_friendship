import AnswerForm from "../AnswerForm/AnswerForm";

/**
 * React component displaying answers editing forms for the current question
 * (used when a user is creating a test)
 * @param {number} correct_answer_id - id of a corrent answer for the current question
 * @param {Array[answer]} answers - array of answers for the current question
 * @param {(answer_id : number) => void} answer_changed - Handler of this event:
 *  user changed an id of a correct answer for the current question
 * (used in a child component AnswerForm)
 * @param {(answer_id : number, new_value : string) => void} change_question_answer_text -
 * Handler of canging an answer's text (used in a child component AnswerForm)
 * @param {(answer_id : number) => void} open_modal - function which opens the modal window
 * where user can choose new emoji for answers (used in a child component AnswerForm)
 */
export default function AnswersBlock({correct_answer_id, answers, answer_changed, change_question_answer_text, open_modal}) {

    return (
        <div>
            {/* iterating over answers for the current question */}
            {answers.map((ans) => {
                //checking if this answer is marked as correct or not 
                let checked = false
                if (correct_answer_id === ans.id) {
                    checked = true
                }

                return (
                    <AnswerForm
                        open_modal={open_modal}
                        checked={checked}
                        answer_id={ans.id}
                        text={ans.text}
                        icon={ans.icon}
                        key={ans.id}
                        answer_changed={answer_changed}
                        change_question_answer_text={change_question_answer_text}>

                    </AnswerForm>
                )
            })}
        </div>
    );
}