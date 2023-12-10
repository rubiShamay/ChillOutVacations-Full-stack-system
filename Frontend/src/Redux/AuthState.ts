import {jwtDecode} from "jwt-decode";
import UserModal from "../Models/UserModel";
import { createStore } from "redux";
import { VacationActionType, VacationsAction, vacationsStore } from "./VacationsState";

export class AuthState {
    public user: UserModal = null
    public token: string = null

    constructor(){
        this.token = sessionStorage.getItem("token")
        if(this.token){
            this.user = jwtDecode<{ user: UserModal }>(this.token).user;
        }
    }
}

export enum AuthActionType {
    Register = "Register",
    Login = "Login",
    Logout = "Logout"
}

export interface AuthAction {
    type: AuthActionType,
    payload?: any
}
function authReducer(currentState = new AuthState(), action: AuthAction): AuthState {
    const newState = { ...currentState }

    switch (action.type) {
        case AuthActionType.Register:
        case AuthActionType.Login:
            newState.user = jwtDecode<{ user: UserModal }>(action.payload).user;
            newState.token = action.payload;
            sessionStorage.setItem(`token` ,`${newState.token}`)
            console.log(newState.user)
            break;
        case AuthActionType.Logout:
            newState.user = null
            newState.token = null;
            sessionStorage.removeItem("token")
            const removeStateVacation:VacationsAction = {type:VacationActionType.ClearAll}
            vacationsStore.dispatch(removeStateVacation)
            break;
    }
    return newState
}

export const authStore = createStore(authReducer)