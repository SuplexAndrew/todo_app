import React from 'react'
import './App.css';
import {store} from "./Redux";
import {Provider} from "react-redux";
import App from "./App";

const ProviderComponent: React.FC = () => {

    return (
        <Provider store={store}>
            <App/>
        </Provider>
    )
}

export default ProviderComponent
