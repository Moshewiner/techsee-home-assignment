import React from 'react';
import './App.css';
import HomePage from './pages/home/home-page.component';
import { Initialize } from './services/services.initializer';
import { DataFormatterContext } from './services/data-formatters/data-formatters.context';

const { bugsFormatter } = Initialize();

function App() {
    return (
        <DataFormatterContext.Provider value={bugsFormatter}>
            <HomePage></HomePage>;
        </DataFormatterContext.Provider>
    );

}

export default App;
