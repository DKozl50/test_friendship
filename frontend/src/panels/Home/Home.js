import {useEffect, useState} from 'react';
import ButtonXl from '../../components/ButtonXl/ButtonXl';
import './Home.css'
import {Icon28DeleteOutline} from '@vkontakte/icons';
import {delete_test, get_test} from '../../api';
import Spinner from '../../components/Spinner/Spinner';
import main_banner_config from "../../data/main_banner.json"
import {Icon28MotorcycleOutline} from '@vkontakte/icons';
import {useNavigationContext} from '../../contexts/NavigationContext/NavigationContextProvider';
import {useTestContext} from '../../contexts/TestContext/TestContextProvider';
import {get_name, share_link} from "../../utils/telegram.utils";
import {get_check_results_array, get_score} from "../../utils/test.utils";
import HomeBanner from "../../components/HomeBanner/HomeBanner";
import ResultsCell from "../../components/ResultsCell/ResultsCell";

/**
 * React component with a home page panel
 */

export default function Home() {
    //an array with results ot attepting user's test
    const [tries, setTries] = useState([])
    //function of changing active panel(for navigation)
    const {changeActivePanel} = useNavigationContext()
    //flag of waiting until delete test request is complete
    const [processingDelete, setProcessingDelete] = useState(false)
    //information of the current test states(see TestContext for details)
    const {
        test_id,
        setTestId,
        questions,
        setQuestions,
        setResults,
        setUserAnswers,
        setOwnerName
    } = useTestContext()

    useEffect(() => {
        setResults([])
        /**
         * Function which gets history of user's test attempts and information about the test
         */
        async function get_history() {
            //all information about the test including history of attempts
            const res = await get_test(test_id)
            if (res === undefined) {
                setTestId(0);
                return;
            }
            setQuestions(res.test.questions)
            setTries(res.test.results.reverse())
        }
        //checking if user has a test 
        if (test_id > 0) {
            get_history()
        }
    }, [test_id])

    /**
     * Function that deletes user's test
     */
    async function go_delete_test() {
        setProcessingDelete(true)
        const res = await delete_test(test_id)
        if (res === undefined) {
            setTestId(0);
            return;
        }
        setTries([])
        setTestId(0)
        setProcessingDelete(false)
    }

    /**
     * Function that returns action buttons for HomeBanner
     * @returns {JSX.Element}
     */
    function get_buttons() {
        //checking if user already has a test 
        if (test_id > 0) {
            return (
                <>
                    <ButtonXl stretched onClick={() => share_link(test_id)}>
                        {main_banner_config["action"][+(test_id > 0)]}
                    </ButtonXl>
                    <ButtonXl style={{marginLeft: 12}} onClick={go_delete_test}>
                        {processingDelete
                            ?
                            <Spinner size="28"/>
                            :
                            <Icon28DeleteOutline/>
                        }
                    </ButtonXl>
                </>
            )
        } else {
            return (
                <ButtonXl disabled={test_id === -1} stretched onClick={() => changeActivePanel('createTest')}>
                    {test_id === -1
                        ?
                        <Spinner size="28"/>
                        :
                        main_banner_config["action"][+(test_id > 0)]
                    }
                </ButtonXl>
            )
        }
    }

    return (
        <div className='home-wrapper'>
            <HomeBanner
                text={main_banner_config["title"][+(test_id > 0)]}
                description={main_banner_config["description"][+(test_id > 0)]}
                img_url={main_banner_config["img_url"][+(test_id > 0)]}
                buttons={
                    get_buttons()
                }
            />

            <section>
                <div className='statistics-label'>
                    Statistics
                </div>
            </section>
            {/* check if there are any attempts to pass user's and
            if there are no attempts display a plug*/}
            {tries.length === 0 &&
                <div className='no-results-wrapper'>
                    <div className="no-results-inner">
                        <div>
                            <Icon28MotorcycleOutline/>
                        </div>
                        <h4>Here will be the results of taking the test!</h4>
                    </div>
                </div>
            }
            {/* iterate over attempts */}
            {tries.map((result) => {
                //get test results
                const check_results = get_check_results_array(result.guesses, questions)
                // get total score by test result
                const score = get_score(check_results) + " out of " + questions.length
                return (
                    <ResultsCell
                        score={score}
                        passerName={result.user_name}
                        onClick={() => {
                            setResults(check_results)
                            setUserAnswers(result.guesses)
                            setOwnerName(get_name())
                            changeActivePanel('testResults')
                        }}
                    />
                )
            })}
        </div>
    );
}