import { FormControlLabel, Pagination } from "@mui/material";
import Checkbox from "@mui/material/Checkbox/Checkbox";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import dataIcon from "../../../Assets/data-analytics.png";
import AddIcon from "../../../Assets/plus-icon.svg";
import UserModel from "../../../Models/UserModel";
import VacationModal from "../../../Models/VacationModel";
import { authStore } from "../../../Redux/AuthState";
import { vacationsStore } from "../../../Redux/VacationsState";
import followersService from "../../../Services/FollowersService";
import notificationService from "../../../Services/NotifyService";
import vacationsService from "../../../Services/vacationsService";
import useTitle from "../../../Utils/UseTitle";
import appConfig from "../../../Utils/app-config";
import VacationsCard from "../VacationCard/VacationCard";
import "./VacationsList.css";


function VacationsList(): JSX.Element {

    useTitle("Chill-Out | Vacations")

    const navigate = useNavigate()

    const [user, setUser] = useState<UserModel>()

    const [feVacations, setVacations] = useState<VacationModal[]>([])


    useEffect(() => {
        const user = authStore.getState().user
        setUser(user)
        if (!user) {
            navigate(appConfig.loginRoute)
            notificationService.error("You must be login")
        } else if (user) {
            vacationsService.getAllVacations(user?.id)
                .then(beVacations => {
                    setVacations(beVacations)
                })
                .catch(err => {
                    if (err.response.status === 401) navigate(appConfig.loginRoute)
                    notificationService.error(err)
                })
        }
    }, [])

    // ******************************** Checkbox's ***********************************

    function VacationUserLiked(event: React.ChangeEvent<HTMLInputElement>): void {
        if (event.target.checked) {
            setVacations(feVacations.filter((v: any) => v.isFollowing === 1))
        }
        else {
            setVacations(vacationsStore.getState().vacations)
        }
    }

    function noStartYet(event: React.ChangeEvent<HTMLInputElement>): void {
        if (event.target.checked) {
            const currentDate = new Date(); // Get current date
            setVacations(feVacations.filter((v: any) => new Date(v.startDate) > currentDate));
        } else {
            setVacations(vacationsStore.getState().vacations);
        }
    }

    function currentVacation(event: React.ChangeEvent<HTMLInputElement>): void {
        if (event.target.checked) {
            const currentDate = new Date();
            setVacations(feVacations.filter((v: any) => new Date(v.startDate) < currentDate && new Date(v.endDate) > currentDate))
        }
        else {
            setVacations(vacationsStore.getState().vacations)
        }
    }

    // ********************************* Pagination *************************************

    const [currentPage, setCurrentPage] = useState(1);

    const vacationsPerPage = 3;

    const indexOfLastVacation = currentPage * vacationsPerPage;
    const indexOfFirstVacation = indexOfLastVacation - vacationsPerPage;
    const currentVacations: VacationModal[] = feVacations.slice(
        indexOfFirstVacation,
        indexOfLastVacation
    );

    const totalPages = Math.ceil(feVacations.length / vacationsPerPage);

    function handlePageChange(event: React.ChangeEvent<unknown>, value: number) { setCurrentPage(value); }


    // ********************************* Delete Vacation *************************************

    async function deleteVacation(id: number) {
        try {
            const ok = window.confirm(`delete vacation ${id} , Are you sure ?`)
            if (!ok) return;
            await vacationsService.deleteVacation(id)
            notificationService.error(`Vacation ${id} deleted`)
            setVacations(feVacations.filter(v => v.id !== id))
        } catch (err: any) { notificationService.error(err.message) }
    }

    // ********************************* User Like's *************************************

    async function userUnlike(userId: number, vacationId: number) {
        try { await followersService.deleteFollower(userId, vacationId) }
        catch (err: any) { notificationService.error(err) }
    }

    async function userLike(userId: number, vacationId: number) {
        try { await followersService.addFollower(userId, vacationId) }
        catch (err: any) { notificationService.error(err) }
    }


    // ********************************* Component *************************************
    return (
        <div className="VacationsList">
            {user?.role === 2 ?
                <div className="btnOfHomePage">
                    <FormControlLabel control={<Checkbox onChange={VacationUserLiked} />} label="You Follow" />
                    <FormControlLabel control={<Checkbox onChange={currentVacation} />} label="Current Vacations" />
                    <FormControlLabel control={<Checkbox onChange={noStartYet} />} label="No Start Yet" />
                </div>
                :
                <div className="btnOfHomePage">
                    <NavLink to={appConfig.addVacationsRoute} title="Add Vacation"><img className="addBtnI" src={AddIcon} /></NavLink>
                    <NavLink to={appConfig.dataRoute} title="Vacations Data"><img className="addBtn" src={dataIcon} /></NavLink>
                </div>
            }    

            {/* {currentVacations.length === 0 ? <></> : <p>Nothing To Show</p>} */}
            {currentVacations && currentVacations?.map((v: any) => <VacationsCard vacation={v} key={v.id} removeVacation={deleteVacation} addFollowerProps={userLike} removeFollowerProps={userUnlike} />)}
            <div className="Pagination">
                <Pagination className="pag"
                    count={totalPages}
                    page={currentPage}
                    onChange={handlePageChange}
                    size="large"
                    />
            </div>
        </div>

    );
}

export default VacationsList;
