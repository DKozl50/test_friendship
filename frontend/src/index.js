import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {TestContextProvider} from './contexts/TestContext/TestContextProvider';
import {NavigationContextProvider} from './contexts/NavigationContext/NavigationContextProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <NavigationContextProvider defaultPanel='loading'>
            <TestContextProvider>
                <App/>
            </TestContextProvider>
        </NavigationContextProvider>
    </React.StrictMode>
);