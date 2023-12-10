import axios from "axios"
import UserModel from "../Models/UserModel"
import appConfig from "../Utils/app-config"
import { AuthAction, AuthActionType, authStore } from "../Redux/AuthState";
import CredentialModel from "../Models/CredentialModel";

class AuthService {

    public async register(user: UserModel): Promise<void> {
        const response = await axios.post(appConfig.registerUrl, user)
        const token = response.data;
        const action: AuthAction = { type: AuthActionType.Register, payload: token }
        authStore.dispatch(action)

    }
    public async login(credentials: CredentialModel): Promise<void> {
        const response = await axios.post(appConfig.loginUrl, credentials)
        const token = response.data;
        const action: AuthAction = { type: AuthActionType.Login, payload: token }
        authStore.dispatch(action)
    }
    public logout(): void {
        const action: AuthAction = { type: AuthActionType.Logout }
        authStore.dispatch(action)
    }

}

const authService = new AuthService()

export default authService