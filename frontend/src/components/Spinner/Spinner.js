import "./Spinner.css";
import { Icon24Spinner } from '@vkontakte/icons';

/**
 * React component with a spinner
 * @param {number} size - Size of spinner in pixels
 * @param {Object} [style = {}] - Additional styles for spinner
 */

export default function Spinner({size, style={}}) {
    return (
        <Icon24Spinner style={style} className={"loader"} width={size} height={size} />
    );
}