import { useNavigationContext } from "../../contexts/NavigationContext/NavigationContextProvider";

/**
 * React component for displaying active panel using panels' ids
 * @param {string} id - id of a panel
 * @param {JSX.Element} children - inner content of a panel
 */

const Panel = ({ id, children }) => {
    const {activePanel} = useNavigationContext();
    return id === activePanel ? children : null
}

export default Panel