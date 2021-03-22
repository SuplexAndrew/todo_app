import React from 'react'
import './App.css';
import {Provider} from "react-redux";
import {store} from "./Redux";
import RootComponent from "./Components/RootComponent";

const App: React.FC = () => {
    return (
        <Provider store={store}>
            <RootComponent />
        </Provider>
    )
}

export default App
