import { useState, useCallback } from "react";
/**
 * React context with information about current test
 * @param {Object} props - initial data of the context
 */
export const useCreateTestContext = function(props) {
    //current user's own test's id
    const [test_id, _setTestId] = useState(-1);
    //id of the test the user is currently taking
    const [testIdForPassing, _setTestIdForPassing] = useState(0);
    //questions of the currently opened test
    const [questions, _setQuestions] = useState([]);
    //results of the current attempt
    const [results, _setResults] = useState([]);
    //user's answers of the current attempt
    const [user_answers, _setUserAnswers] = useState([]);
    //name of an owner of the current test
    const [ownerName, _setOwnerName] = useState('') 
    
    /**
     * @function setResults
     * @description Function for changing the results
     *  of the current attempt 
     * @param {Object} new_results - new results
     */
    const setResults = useCallback((new_results) => 
    _setResults(new_results), [])

    /**
     * @function setQuestions
     * @description Function for changing the questions
     *  of the currently opened test
     * @param {Object} new_questions - new questions
     */
    const setQuestions = useCallback((new_questions) => 
    _setQuestions(new_questions), [])

    /**
     * @function setUserAnswers
     * @description Function for changing the user's answers
     *  of the current attempt
     * @param {Object} new_user_answers - new user's answers
     */
    const setUserAnswers = useCallback((new_user_answers) => 
    _setUserAnswers(new_user_answers), [])

    /**
     * @function setTestId
     * @description Function for changing the
     *  current user's own test's id
     * @param {number} new_test_id - new test's id
     */
    const setTestId = useCallback((new_test_id) => 
    _setTestId(new_test_id), [])

    /**
     * @function setTestIdForPassing
     * @description Function for changing the id
     *  of the test the user is currently taking
     * @param {number} new_test_id - new test's id
     */
    const setTestIdForPassing = useCallback((new_test_id) => 
    _setTestIdForPassing(new_test_id), [])

    /**
     * @function setOwnerName
     * @description Function for changing the name
     *  of an owner of the current test
     * @param {string} new_name - new test's id
     */
    const setOwnerName = useCallback((new_name) => 
    _setOwnerName(new_name), [])

    return {
      test_id, setTestId,
      questions, setQuestions,
      results, setResults,
      user_answers, setUserAnswers,
      testIdForPassing, setTestIdForPassing,
      ownerName, setOwnerName
    };
  }