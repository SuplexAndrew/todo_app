import {ILoginProps} from "../../Models/models";
import axios from "axios";
import {UserAction, UserActionTypes} from "../../Models/User";
import {Dispatch} from "redux";


export const userLogin = (data: ILoginProps) => {
    return async (dispatch: Dispatch<UserAction>) => {
        const t = {
            login: data.login,
            password: data.password
        }
        dispatch({type: UserActionTypes.LOGIN_USER, payload: data})
        axios.post('http://localhost:8000/api/login', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(t)
        })
            .then(response =>
                dispatch({
                    type: UserActionTypes.LOGIN_SUCCESS,
                    payload: response.data
                }))
            .catch(err => dispatch({
                type: UserActionTypes.LOGIN_ERROR,
                payload: err
            }))
    }
}
export const userRegister = (data: ILoginProps, dispatch: Dispatch<UserAction>) => {
    axios.post('http://localhost:3001/api/login/create', {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            firstname: 'Diana', lastname: 'Markova', patronymic: 'Ivanovna',
            login: 'MarkovaDI', password: '1234', leaderid: 1
        })
    }).then(response => dispatch({type: UserActionTypes.LOGIN_SUCCESS, payload: response.data}))
        .catch(err => {
            dispatch({
                type: UserActionTypes.LOGIN_ERROR,
                payload: err.message
            })
        })
}
export const userLogout = () => {
    return (dispatch: Dispatch<UserAction>) => dispatch({type: UserActionTypes.LOGOUT_USER})
}
