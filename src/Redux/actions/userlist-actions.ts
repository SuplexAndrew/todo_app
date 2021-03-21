import {UserListAction, UserListActionTypes} from "../reducers/UserListReducer";
import {Dispatch} from "react";
import axios from "axios";

export const fetchUserList = () => {
    return async (dispatch: Dispatch<UserListAction>) => {
        try {
            dispatch({type: UserListActionTypes.FETCH_USERLIST})
            const response = await axios.get('http://localhost:8000/api/users')
            setTimeout(() => {
                dispatch({type: UserListActionTypes.FETCH_USERLIST_SUCCESS, payload: response.data})
            }, 500)
        } catch (e) {
            dispatch({
                type: UserListActionTypes.FETCH_USERLIST_ERROR,
                payload: 'Произошла ошибка при загрузке пользователей'
            })
        }
    }
}
