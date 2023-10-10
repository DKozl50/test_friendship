import "./RoundButton.css";
/**
 * React component with a round button
 * @param {boolean} disabled - Describes if button is active or not
 * @param {() => void} onClick - button click handler
 * @param {JSX.Element} children - inner content of the button
 */
export default function RoundButton({disabled, onClick, children}){
    return (
        <button onClick={onClick} className="round-button" disabled={disabled}>
            <div className="round-button__content">
                {children}
            </div>
        </button>
    );
}