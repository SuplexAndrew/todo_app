import React from "react";
import {User} from "../Models/User";
import {useActions} from "../Hooks/useActions";

interface IProps {
    user: User | null
  }

export const Header : React.FC<IProps> = (user) => {
    const {userLogout} = useActions()
    return (
        <div
            className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
            <h5 className="my-0 mr-md-auto font-weight-normal">Task Manager</h5>
            <nav className="my-2 my-md-0 mr-md-3">
                <p className="p-2 text-dark" >{user.user?.login ?? ''}</p>
            </nav>
            <p className="btn btn-outline-primary"
               onClick={() => userLogout()}>Выйти</p>
        </div>
    )
}
