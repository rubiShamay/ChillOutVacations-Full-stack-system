import { NavLink, useNavigate } from "react-router-dom"
import "./Login.css"
import useTitle from "../../../Utils/UseTitle"
import CredentialModel from "../../../Models/CredentialModel"
import { useForm } from "react-hook-form"
import authService from "../../../Services/AuthService"
import notificationService from "../../../Services/NotifyService"
import appConfig from "../../../Utils/app-config"

function Login(): JSX.Element {

    useTitle("Chill Out - Login")

    const {register , handleSubmit} = useForm<CredentialModel>()

    const navigate = useNavigate();
    
    async function send(Credentials:CredentialModel){
        try{
            await authService.login(Credentials);
            notificationService.success("You Have been logged-in successfully")
            navigate(appConfig.vacationsRoute)
        }
        catch(err:any){
            notificationService.error(err)
        }
    }

    return (
        <div className="Login">
            <h2>Login</h2>
            <form onSubmit={handleSubmit(send)}>
                <label>E-mail : </label>
                <input type="email" required {...register("email")}/>
                <label>PassWord: </label>
                <input type="password" required minLength={4} {...register("password")}/>
                <button>Login</button>
                <p >Don't have account ?</p>
                <NavLink className={"RegisterLink"} to={appConfig.registerRoute}>Click Here</NavLink>
            </form>
        </div>
    )
}

export default Login