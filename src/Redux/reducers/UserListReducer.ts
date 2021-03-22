import {Reducer} from "react";
import {User} from "../../Models/User";

export type UserListState = {
    users: User[],
    loading: boolean,
    error: null | string
}

const InitialState: UserListState = {
    users: [],
    loading: false,
    error: null
}
export enum UserListActionTypes {
    FETCH_USERLIST = 'FETCH_USERLIST',
    FETCH_USERLIST_SUCCESS = 'FETCH_USERLIST_SUCCESS',
    FETCH_USERLIST_ERROR = 'FETCH_USERLIST_ERROR',
}
interface IFetchUserListAction {
    type: UserListActionTypes.FETCH_USERLIST;
}
interface IFetchUserListSuccessAction {
    type: UserListActionTypes.FETCH_USERLIST_SUCCESS;
    payload: User[]
}
interface IFetchUserListErrorAction {
    type: UserListActionTypes.FETCH_USERLIST_ERROR;
    payload: null | string;
}
export type UserListAction = IFetchUserListAction | IFetchUserListSuccessAction | IFetchUserListErrorAction

export const UserListReducer:Reducer<UserListState, UserListAction> =
    (state = InitialState, action: UserListAction) => {
    switch (action.type) {
        case UserListActionTypes.FETCH_USERLIST:
            return {loading: true, error: null, users: state.users}
        case UserListActionTypes.FETCH_USERLIST_SUCCESS:
            console.log(action.payload)
            return {loading: false, error: null, users: action.payload}
        case UserListActionTypes.FETCH_USERLIST_ERROR:
            return {loading: false, error: action.payload, users: state.users}
        default:
            return state
    }
}
