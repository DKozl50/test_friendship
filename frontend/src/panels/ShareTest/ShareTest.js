import "./ShareTest.css"
import ButtonXl from "../../components/ButtonXl/ButtonXl";
import {useNavigationContext} from "../../contexts/NavigationContext/NavigationContextProvider";
import {useTestContext} from "../../contexts/TestContext/TestContextProvider";
import {share_link, copy_link} from "../../utils/telegram.utils";

/**
 * React component with a sharing test panel
 * (Used after creation of a test)
 */
export default function ShareTest() {
    //function which changes an active panel (used for navigation)
    const {changeActivePanel} = useNavigationContext()
    // id of a created test
    const {test_id} = useTestContext()

    return (
        <div className="share-test">
            <div className="share-test__top">
                <img
                    className="share-test__img"
                    src="https://vk.app-dich.com/static/emojies/partying_face.png"
                    alt="partying_face"
                />
            </div>
            <div className="share-test__text">
                <div className="share-test__title">
                    Test is created!
                </div>
                <div className="share-test__caption">
                    Now you can share the test with your friend. How will do it?
                </div>
            </div>
            <div className="share-test__buttons">
                <ButtonXl onClick={() => share_link(test_id)}>
                    Share
                </ButtonXl>
                <ButtonXl onClick={() => copy_link(test_id)}>
                    Copy link
                </ButtonXl>
                <ButtonXl
                    style={{backgroundColor: "transparent", color: "var(--tg-theme-text-color)"}}
                    onClick={() => changeActivePanel('home')}
                >
                    Skip
                </ButtonXl>
            </div>
        </div>
    );
}