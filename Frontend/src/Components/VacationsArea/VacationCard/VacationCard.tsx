import { Favorite, FavoriteBorder } from "@mui/icons-material";
import DeleteIcon from '@mui/icons-material/Delete';
import UploadIcon from '@mui/icons-material/Upload';
import { Button, Card, Checkbox } from "@mui/material";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import FollowersModel from "../../../Models/FollowersModel";
import UserModel from "../../../Models/UserModel";
import VacationModal from "../../../Models/VacationModel";
import { authStore } from "../../../Redux/AuthState";
import followersService from "../../../Services/FollowersService";
import notificationService from "../../../Services/NotifyService";
import vacationsService from "../../../Services/vacationsService";
import appConfig from "../../../Utils/app-config";
import "./VacationCard.css";


type VacationProp = {
    vacation: VacationModal
}

function VacationCard(props: VacationProp): JSX.Element {

    const navigate = useNavigate()

    const id = props.vacation.id;

    const [checked, setChecked] = useState<boolean>(false);

    const [user, setUser] = useState<UserModel>();

    const [countFollowers, setCountFollowers] = useState<number>(props.vacation.followersCount)

    // const [isFollow, setIsFollow] = useState<number>(props.vacation.isFollowing)

    useEffect(() => {

        setUser(authStore.getState().user)

        if (props?.vacation?.isFollowing === 1) setChecked(true)

        const unSubscribe = authStore.subscribe(() => {
            setUser(authStore.getState().user)
        })

        return unSubscribe
    }, [])


    async function deleteVacation() {
        try {
            const ok = window.confirm(`delete vacation ${id} , Are you sure ?`)
            if (!ok) return;
            await vacationsService.deleteVacation(id)
            notificationService.error(`Vacation ${id} deleted`)
            navigate(appConfig.vacationsRoute)
        }
        catch (err: any) {
            notificationService.error(err.message)
        }
    }


    async function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        if (event.target.checked) {
            setChecked(true)
            const follower: FollowersModel = {
                "userId": user.id,
                "vacationId": props?.vacation.id
            }
            setCountFollowers(countFollowers + 1)
            await followersService.addFollower(follower)
        }
        if (!event.target.checked) {
            setChecked(false)
            setCountFollowers(countFollowers - 1)
            await followersService.deleteFollower(user.id, props.vacation.id)
        }
    };


    return (
        <div className="Card">
            <Card variant="outlined">
                <div className="headersCard">
                    {user?.role === 1 ?
                        <div className="adminBtn">
                            <NavLink to={appConfig.updateVacationRoute + props.vacation.id}>
                                <Button style={{ textTransform: 'none' }} variant="outlined">
                                    <UploadIcon />Update
                                </Button>
                            </NavLink>
                            <Button onClick={deleteVacation} style={{ textTransform: 'none' }} variant="outlined" color="error">
                                <DeleteIcon /> Delete
                            </Button>
                        </div> :
                        <div>
                            <Checkbox icon={<FavoriteBorder />} onChange={handleChange} checked={checked} checkedIcon={<Favorite />} />
                            <span>{countFollowers}</span>
                        </div>
                    }
                </div>
                <p className="titleCard">{props.vacation.name}</p>
                <img className="bgCard" src={props.vacation.imageUrl} />
                <p className="dates">{props.vacation.startDate} / {props.vacation.endDate}</p>
                <div className="footerCard">
                    <p className="des">{props.vacation.description}</p>
                    <Button style={{ textTransform: 'none' }} variant="contained">Only {props.vacation.price} $</Button>
                </div>
            </Card>

        </div>

    );
}

export default VacationCard;
