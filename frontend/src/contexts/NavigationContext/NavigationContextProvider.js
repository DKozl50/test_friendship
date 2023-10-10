import { useContext, createContext } from "react";
import { useCreateNavigationContext } from './NavigationContext'

//React context
const Context = createContext(null);

/**
 * The task of the provider is to wrap components
 *  that will use the global variables of the context.
 * @param {Object} props - The provider props contain the initial values.
*/
export const NavigationContextProvider = ({ children, ...props }) => {
    const context = useCreateNavigationContext(props);
    return <Context.Provider value={context}>{children}</Context.Provider>;
  };


/**
 * Custom hook in the provider lets us not to export the context
 *  and pass it every time as a parameter from the components
 *  where we will use it
 */

export function useNavigationContext() {
    const context = useContext(Context);
    if (!context) throw new Error('Use app context within provider!');
    return context;
}

