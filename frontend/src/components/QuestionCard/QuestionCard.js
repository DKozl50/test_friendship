import "./QuestionCard.css"

/**
 * React component with a card containing a question(used when user creates a test)
 * @param {string} text - text of the current question which is displayed on card
 * @param {string} background - background color of the card
 */

export default function QuestionCard({text, background}) {
    return (
        <div
            className="question-card"
            style={{background: background}}
        >
            <div className="question-card__in">
                {text}
            </div>
        </div>
    )
}