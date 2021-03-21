import React, {useState} from 'react'
import './App.css';
import {Main} from "./Components/Main";
import {Provider, useStore} from "react-redux";
import {Header} from "./Components/Header";
import {Login} from "./Components/Login";
import {User} from "./Models/User";

const App: React.FC = () => {
    const store = useStore()
    const [user, setUser] = useState<User | null>(null)
    store.subscribe(() => setUser(store.getState().user))
    return (
        <>
            {user != null && <Header  user={user}/>}
            {user == null && <Login/>}
            {user != null && <Main/>}
        </>
    )
}

export default App
