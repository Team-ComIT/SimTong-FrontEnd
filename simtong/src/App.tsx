import React from 'react';
import style from './GolobalStyles';
import { Global } from '@emotion/react';
import './App.css';

function App() {
    return (
        <div className="App">
            <Global styles={style} />
        </div>
    );
}

export default App;
