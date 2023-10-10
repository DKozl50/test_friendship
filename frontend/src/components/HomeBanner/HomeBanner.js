import "./HomeBanner.css";
import Emoji from "../Emoji/Emoji";
/**
 * React component with a big banner (It is displayed on the home page)
 * @param {string} text - text of a header of the banner
 * @param {string} description - text below the header (description) of the banner
 * @param {string} img_url - url of an image displayed at the top of the banner
 * @param {JSX.Element} buttons - buttons displayed at the bottom of the banner(actions)
 */
export default function HomeBanner({text, description, img_url, buttons}) {

    return (
        <div className="banner-wrapper">
            <div className="banner-inner">
                <div className='banner-icon-wrapper'>
                    <Emoji size={50} src={img_url}/>
                </div>
                <div className='banner-text-wrapper'>
                    <h1 className='banner-text'>
                        {text}
                    </h1>
                </div>
                <div className='banner-description-wrapper'>
                    <div className='banner-description'>
                        {description}
                    </div>
                </div>
                <div className='banner-buttons'>
                    {buttons}
                </div>
            </div>
        </div>
    );
}