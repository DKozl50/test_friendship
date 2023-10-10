import "./ButtonXl.css";

/**
 * React component with a big rectangular button
 * @param {boolean} disabled - defines if button is active or not
 * @param {() => void} onClick - click on the button event handler
 * @param {Object} style - custom styles object
 * @param {JSX.Element} children - inner content of the button
 * @param {boolean} [stretched = false] - defines if button takes all space available (true)
 *  or has fixed width (false)  
 */

export default function ButtonXl({disabled, onClick, style, children, stretched = false}) {
    return (
        <button
            onClick={onClick}
            className={"button-xl " + (stretched ? "stretched" : "")}
            disabled={disabled}
            style={style}
        >
            <div className="button-xl__content">
                {children}
            </div>
        </button>
    );
}