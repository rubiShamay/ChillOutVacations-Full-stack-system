import { Navigate, Route, Routes } from "react-router-dom";
import appConfig from "../../../Utils/app-config";
import Login from "../../AuthArea/Login/Login";
import Register from "../../AuthArea/Register/Register";
import ChartDate from "../../DataArea/Chart/Chart";
import Home from "../../HomeArea/Home/Home";
import AddVacation from "../../VacationsArea/AddVacation/AddVacation";
import UpdateVacation from "../../VacationsArea/UpdateVacation/UpdateVacation";
import VacationsList from "../../VacationsArea/VacationsList/VacationsList";
import PageNotFound from "../PageNotFound/page-not-found";

function Routing(): JSX.Element {
    return (
        <div className="Routing">
            <Routes>
                {/* Home Route */}
                <Route path={appConfig.homeRoute} element={<Home />} />

                {/* Data Route */}
                <Route path={appConfig.dataRoute} element={<ChartDate />} />

                {/* Auth routes */}
                <Route path={appConfig.registerRoute} element={<Register />} />
                <Route path={appConfig.loginRoute} element={<Login />} />

                {/* Vacations Routes */}
                <Route path={appConfig.vacationsRoute} element={<VacationsList />} />
                <Route path={appConfig.addVacationsRoute} element={<AddVacation />} />
                <Route path={appConfig.updateVacationRoute + ":prop"} element={<UpdateVacation />} />

                {/* Default routing */}
                <Route path="/" element={<Navigate to={appConfig.homeRoute} />} />
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </div>
    )
}

export default Routing