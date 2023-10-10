import {useState} from "react";
import Spinner from "../Spinner/Spinner";

/**
 * React component with a dynamic loading emoji
 * @param {string} src - url of the emoji
 * @param {number} size - size of the emoji image in pixels
 */
export default function Emoji({src, size}) {
    //this flag indicates if image is loaded or not
    const [loaded, setLoaded] = useState(false)
    return (
        <>
            <img
                style={{display: (loaded ? 'unset' : 'none')}}
                alt="icon"
                onLoad={() => setLoaded(true)}
                height={size}
                src={src}
            />
            {/* spinner is showed while image is not loaded  */}
            {!loaded &&
                <Spinner style={{color: "var(--tg-theme-hint-color)"}} size={size}/>
            }
        </>
    );
}