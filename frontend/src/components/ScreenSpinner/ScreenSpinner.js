import "./ScreenSpinner.css";
import Spinner from "../Spinner/Spinner";

/**
 * React component with a horisontally centered spinner
 */

export default function ScreenSpinner() {
    return (
        <div className={"screen-spinner"} >
            <Spinner size="28"/>
        </div>
    );
}