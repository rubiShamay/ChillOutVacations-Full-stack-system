import { NavLink } from "react-router-dom"
import appConfig from "../../../Utils/app-config"
import AuthMenu from "../../AuthArea/AuthMenu/AuthMenu"
import "./Header.css"

function Header(): JSX.Element {
    return (
        <div className="Header">
            <NavLink className={"vacationLink"} to={appConfig.vacationsRoute}><h1>Chill Out Vacations</h1></NavLink>
            <AuthMenu />
        </div>
    )
}

export default Header