import { useEffect, useState } from "react"
import UserModel from "../../../Models/UserModel"
import { authStore } from "../../../Redux/AuthState"
import "./AuthMenu.css"
import { NavLink } from "react-router-dom"
import appConfig from "../../../Utils/app-config"
import notificationService from "../../../Services/NotifyService"
import authService from "../../../Services/AuthService"

function AuthMenu(): JSX.Element {

    const [user, setUser] = useState<UserModel>()

    useEffect(() => {

        setUser(authStore.getState().user)

        const unSubscribe = authStore.subscribe(() => {
            setUser(authStore.getState().user)
        })

        return unSubscribe
    }, [])

    function logoutMe(): void {
        authService.logout();
        notificationService.success("Bye Bye")
    }

    return (
        <div className="AuthMenu">
            {!user &&
                <p>
                    <span>Hello Guest</span>
                </p>}
            {user &&
                <p>
                    <span>Hello {user.firstName + " " + user.lastName}</span>
                    <span> | </span>
                    <NavLink onClick={logoutMe} to={"/#"}>Logout</NavLink>
                </p>
            }
        </div>
    )
}

export default AuthMenu