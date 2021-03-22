import React, {useState} from 'react'
import '../App.css';
import {Main} from "./Main";
import {useStore} from "react-redux";
import {Header} from "./Header";
import {Login} from "./Login";
import {User} from "../Models/User";

const RootComponent: React.FC = () => {
    const store = useStore()
    const [user, setUser] = useState<User | null>(null)
    store.subscribe(() => setUser(store.getState().user.user))
    return (
        <>
            {user !== null && <Header user={user}/>}
            {user === null && <Login/>}
            {user !== null && <Main user={user}/>}
        </>
    )
}

export default RootComponent
