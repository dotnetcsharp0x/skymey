export enum UserActionTypes {
    FETCH_USERS = 'FETCH_USERS',
    FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS',
    FETCH_USERS_ERROR = 'FETCH_USERS_ERROR',
    LOGIN_USER = 'FETCH_USERS',
    LOGIN_USER_ERROR = 'LOGIN_USER_ERROR',
    LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS',
    REGISTER_USER = 'FETCH_USERS',
    REGISTER_USER_ERROR = 'REGISTER_USER_ERROR',
    REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS'
}

export interface IFetchUserAction {
    type: UserActionTypes.FETCH_USERS;
}
export interface IFetchUserSuccessAction {
    type: UserActionTypes.FETCH_USERS_SUCCESS;
    payload: any[];
}
export interface IFetchUserErrorAction {
    type: UserActionTypes.FETCH_USERS_ERROR;
    payload: string;
    status: number;
}
export interface ILoginUserAction {
    type: UserActionTypes.FETCH_USERS;
}
export interface ILoginUserErrorAction {
    type: UserActionTypes.LOGIN_USER_ERROR;
    payload: string;
    status: number;
    message: string;
}
export interface ILoginUserSuccessAction {
    type: UserActionTypes.LOGIN_USER_SUCCESS;
    payload: string;
    status:number;
    message: string;
}
export interface IRegisterUserAction {
    type: UserActionTypes.FETCH_USERS;
}
export interface IRegisterUserErrorAction {
    type: UserActionTypes.REGISTER_USER_ERROR;
    payload: string;
    status: number;
    message: string;
}
export interface IRegisterUserSuccessAction {
    type: UserActionTypes.REGISTER_USER_SUCCESS;
    payload: string;
    status:number;
    message: string;
}