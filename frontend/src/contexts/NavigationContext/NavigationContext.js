import { useState, useCallback, useEffect } from "react";

/**
 * React context for navigation in the app
 * @param {Object} props - initial data of the context
 */
export const useCreateNavigationContext = function(props) {
    
    //active panel's id
    const [activePanel, setActivePanel] = useState(props.defaultPanel || 'home');

    
    useEffect(() => {
      //subscribing for a back button event
      window.Telegram.WebApp.BackButton.onClick(() => {
        //returning home and hiding the back button
        setActivePanel("home");
        window.Telegram.WebApp.BackButton.hide();
      });

        window.Telegram.WebApp.onEvent("popupClosed", (event) => {
            if (event['button_id'] === 'error') {
                changeActivePanel("home")
            }
        })

    }, [])
    
    /**
     * @function changeActivePanel
     * @description Function for changing the active panel
     * @param {string} newPanel - New panel's id
     */
    const changeActivePanel = useCallback((newPanel) => {
        setActivePanel(newPanel);
        //home button is active everywhere except the home page
        if (newPanel !== "home") {
          window.Telegram.WebApp.BackButton.show();
        } else {
          window.Telegram.WebApp.BackButton.hide();
        }
      });

    return {
      activePanel,
      changeActivePanel
    };
  }