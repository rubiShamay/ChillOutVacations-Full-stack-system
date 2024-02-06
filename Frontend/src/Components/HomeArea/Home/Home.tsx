import { Button } from "@mui/material"
import "./Home.css"
import { NavLink } from "react-router-dom"
import appConfig from "../../../Utils/app-config"
import useTitle from "../../../Utils/UseTitle"

function Home(): JSX.Element {

    useTitle("Chill Out - Home")

    return (
        <div className="Home">
            <div className="authButton">
                <NavLink to={appConfig.loginRoute}>
                    <Button style={{textTransform: 'none'}}  variant="contained">Login</Button>
                </NavLink>
                <NavLink to={appConfig.registerRoute}>
                    <Button style={{textTransform: 'none'}}  variant="contained">Register</Button>
                </NavLink>
            </div>
            <div className="containerPage">
                <div className="cardPage">
                    <h2>Travel Deals Website</h2>
                    <p>Explore a wide range of vacation deals to selected destinations with cost-effective offers. Flights, hotels, and vacation packages at affordable prices. Join now and receive exclusive offers for vacations to various destinations.</p>
                </div>
                <div className="cardPage">
                    <h2>Family Vacation Site</h2>
                    <p>Both locally and globally: Direct flights, luxurious hotels, and activities for all ages. Stay updated on daily deals and special benefits for subscribers.</p>
                </div>
                <div className="cardPage">
                    <h2>International Experiences</h2>
                    <p>Personalized vacation plans: Affordable flights, a rich variety of hotels, and fascinating activities. Plan a vacation that will stay in your memory for years.</p>
                </div>
            </div>
        </div>
    )
}

export default Home