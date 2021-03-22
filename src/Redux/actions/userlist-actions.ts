import {UserListAction, UserListActionTypes} from "../reducers/UserListReducer";
import {Dispatch} from "react";
import axios from "axios";

export const fetchUserList = (id: number | undefined) => {
    return async (dispatch: Dispatch<UserListAction>) => {

        dispatch({type: UserListActionTypes.FETCH_USERLIST})
        axios.get(`http://localhost:8000/api/users?id=${id}`)
            .then(response =>
                dispatch({type: UserListActionTypes.FETCH_USERLIST_SUCCESS, payload: response.data})
            ).catch(err => dispatch({
            type: UserListActionTypes.FETCH_USERLIST_ERROR,
            payload: err.message
        }))
    }
}
