import {ILoginProps} from "./models";

export type User = {
    id: number,
    login: string,
    firstname: string,
    lastname: string,
    patronymic: string,
    leaderid: number
}

export interface UserState {
    user: User | null | undefined
    loading: boolean
    error: null | string
}

export enum UserActionTypes {
    LOGIN_USER = 'LOGIN_USER',
    LOGOUT_USER = 'LOGOUT_USER',
    LOGIN_ERROR = 'LOGIN_ERROR',
    LOGIN_SUCCESS = 'LOGIN_SUCCESS',
}

interface LoginUserAction {
    type: UserActionTypes.LOGIN_USER;
    payload: ILoginProps
}

interface LoginSuccessAction {
    type: UserActionTypes.LOGIN_SUCCESS;
    payload: User
}

interface LoginErrorAction {
    type: UserActionTypes.LOGIN_ERROR;
    payload: null | string;
}

interface LogoutUserAction {
    type: UserActionTypes.LOGOUT_USER;
}

export type UserAction = LoginUserAction | LoginErrorAction | LoginSuccessAction | LogoutUserAction
