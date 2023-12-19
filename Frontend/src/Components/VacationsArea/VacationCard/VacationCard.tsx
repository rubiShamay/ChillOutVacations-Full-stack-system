import { Favorite, FavoriteBorder } from "@mui/icons-material";
import DeleteIcon from '@mui/icons-material/Delete';
import UploadIcon from '@mui/icons-material/Upload';
import { Button, Card, Checkbox } from "@mui/material";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import UserModel from "../../../Models/UserModel";
import VacationModal from "../../../Models/VacationModel";
import { authStore } from "../../../Redux/AuthState";
import notificationService from "../../../Services/NotifyService";
import appConfig from "../../../Utils/app-config";
import "./VacationCard.css";


type VacationProp = {
    vacation: VacationModal;
    removeVacation: (vacationId: number) => void;
    addFollowerProps: (userId: number, vacationId: number) => void;
    removeFollowerProps: (userId: number, vacationId: number) => void;
}

function VacationCard(props: VacationProp): JSX.Element {

    const [checked, setChecked] = useState<boolean>(false);

    const [user, setUser] = useState<UserModel>();

    const [countFollowers, setCountFollowers] = useState<number>(props.vacation.followersCount)

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
            await props.removeVacation(props.vacation.id)
        }
        catch (err: any) { notificationService.error(err) }
    }


    async function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        if (event.target.checked) {
            setChecked(true)
            await props.addFollowerProps(user.id, props.vacation.id)
            setCountFollowers(countFollowers + 1)
        }
        if (!event.target.checked) {
            setChecked(false)
            await props.removeFollowerProps(user.id, props.vacation.id)
            setCountFollowers(countFollowers - 1)
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
