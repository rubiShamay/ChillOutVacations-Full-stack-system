import { NavLink, useNavigate } from "react-router-dom";
import useTitle from "../../../Utils/UseTitle";
import "./Register.css";
import { useForm } from "react-hook-form";
import notificationService from "../../../Services/NotifyService";
import authService from "../../../Services/AuthService";
import UserModel from "../../../Models/UserModel";
import appConfig from "../../../Utils/app-config";

function Register(): JSX.Element {

    useTitle("Chill Out - Register");

    const {register , handleSubmit } = useForm<UserModel>();

    const navigate = useNavigate();

    async function sendUser(user:UserModel){
        try{
            await authService.register(user);
            navigate(appConfig.vacationsRoute)
            notificationService.success("You Have been register successfully")
        }
        catch(err:any){
            notificationService.error(err)
        }
    }

    return (
        <div className="Register">
            <h2>Register</h2>
            <form onSubmit={handleSubmit(sendUser)}>
                <label>First Name : </label>
                <input type="text" required {...register("firstName")}/>
                <label>Last Name : </label>
                <input type="text" required {...register("lastName")}/>
                <label>E-mail : </label>
                <input type="text" required {...register("email")}/>
                <label>PassWord: </label>
                <input type="password" required minLength={4} {...register("password")}/>
                <button>Register</button>
                <p >already a friend ?</p>
                <NavLink className={"RegisterLink"} to={appConfig.loginRoute}>Login</NavLink>
            </form>
        </div>
    )
}

export default Register