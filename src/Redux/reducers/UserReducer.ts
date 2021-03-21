import {Reducer} from "react";
import {UserAction, UserActionTypes, UserState} from "../../Models/User";

const InitialState: UserState = {
    user: undefined,
    loading: false,
    error: null,
}

export const UserReducer:Reducer<UserState, UserAction> = (state = InitialState, action: UserAction) => {
    switch (action.type) {
        case UserActionTypes.LOGIN_USER:
            return {loading: true, error: null, user: state.user}
        case UserActionTypes.LOGIN_ERROR:
            return {loading: false, error: action.payload, user: null}
        case UserActionTypes.LOGIN_SUCCESS:
            localStorage.setItem('user', action.payload.login )
            return {loading: false, error: null, user: action.payload}
        case UserActionTypes.LOGOUT_USER:
            return {loading: false, error: null, user: null, token: null}
        default:
            return state
    }
}
