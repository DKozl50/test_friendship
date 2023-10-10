import {useEffect} from 'react';
import CreateTest from './panels/CreateTest/CreateTest';
import Panel from "./components/Panel/Panel";
import ShareTest from "./panels/ShareTest/ShareTest";
import Home from "./panels/Home/Home";
import PassTest from './panels/PassTest/PassTest';
import TestResults from './panels/TestResults/TestResults';
import {init} from "./api";
import {useNavigationContext} from './contexts/NavigationContext/NavigationContextProvider';
import {useTestContext} from './contexts/TestContext/TestContextProvider';
import ScreenSpinner from './components/ScreenSpinner/ScreenSpinner';

let cnt = 0;

function App() {
    //test information
    const {setTestId, setTestIdForPassing} = useTestContext()
    //function which chanhes an active panel (used for navigation)
    const {changeActivePanel} = useNavigationContext();

    useEffect(() => {
        /**
         * function which performs an init request
         * 
         */
        async function fetchData() {
            // prevent twice running in development mode
            // https://stackoverflow.com/questions/72238175/why-useeffect-running-twice-and-how-to-handle-it-well-in-react
            if (cnt !== 0) return
            cnt++;
            const res = await init()
            if (res === undefined)
                return
            if (res.user.test_ids.length > 0) {
                setTestId(res.user.test_ids[0])
            } else {
                setTestId(0)
            }

            if (!window.Telegram.WebApp.isExpanded) {
                window.Telegram.WebApp.expand();
            }

            const href = window.Telegram.WebApp.initDataUnsafe.start_param
            console.log("href ", href)
            if (href && href.slice(0, 7) === "testid_" && !isNaN(href.slice(7))) {
                const testId = href.slice(7);
                setTestIdForPassing(testId)
                changeActivePanel("passTest")
            } else {
                changeActivePanel("home")
            }

            window.Telegram.WebApp.requestWriteAccess()
        }
        fetchData()
    }, [])

    return (
        <>
            <Panel id="loading">
                <ScreenSpinner/>
            </Panel>
            <Panel id="createTest">
                <CreateTest/>
            </Panel>
            <Panel id="shareTest">
                <ShareTest/>
            </Panel>
            <Panel id="home">
                <Home/>
            </Panel>
            <Panel id="passTest">
                <PassTest/>
            </Panel>
            <Panel id="testResults">
                <TestResults/>
            </Panel>
        </>
    );
}

export default App;
