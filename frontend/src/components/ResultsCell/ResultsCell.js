import "./ResultsCell.css"
import {Icon24ChevronRight} from "@vkontakte/icons";

/**
 * React component with a result of taking a test cell
 * (Used on the home page)
 * @param {() => void} onClick - click on a cell handler
 * @param {string} score - passing score of the current result
 * @param {string} passerName - the name of the user whose result this is
 */

export default function ResultsCell({onClick, score, passerName}) {
    return (
        <div className='result-wrapper' onClick={onClick}>
            <div className='result-content'>
                <div className='result-name'>
                    <span>
                        {passerName}
                    </span>
                </div>
                <div className="result-score-wrapper">
                    <span>
                        {score}
                    </span>
                    <Icon24ChevronRight/>
                </div>
            </div>

        </div>
    )
}