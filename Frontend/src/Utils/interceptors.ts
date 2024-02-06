import axios from "axios"
import { authStore } from "../Redux/AuthState"

class Interceptors {

    // Send the Token
    public create() {
        axios.interceptors.request.use(function (requestObj) {
            if (authStore.getState().token) {
                requestObj.headers.Authorization = `Bearer ${authStore.getState().token}`
            }
            return requestObj
        })
    }
}

const interceptors = new Interceptors()

export default interceptors