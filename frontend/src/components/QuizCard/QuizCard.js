import React from "react";
import './QuizCard.css'
/**
 * React component with a card containing a question(is used when user takes a test)
 * @param {string} animation - current CSS class of the card (used for animation)
 * @param {string} text - text of the question which is displayed on card
 * @param {string} name - name of a user currently taking a test
 * @param {Array[answer]} answers - array of answers for the current question
 * @param {string} background - background color of the card
 */
export default function QuizCard({animation, text, name, answers, background}) {
    //making a question string
    let question_string = text.replace('$name', name) + "? "
    answers.forEach((answer, index) => {
        question_string += answer.text + " "
        if (index < answers.length - 1) {
            question_string += " or "
        }
    })
    question_string += "?"

    return (
        <div
            className={"quiz-question-card " + animation}
            style={{background: background}}
        >
            <div className="quiz-question-card__in">
                {question_string}
            </div>
        </div>
    );
}

