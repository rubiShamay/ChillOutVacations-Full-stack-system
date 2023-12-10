import { useForm } from "react-hook-form"
import "./AddVacation.css"
import VacationModal from "../../../Models/VacationModel"
import { useEffect, useState } from "react";
import useImagePreview from "../../../Utils/UseImagePreview";
import vacationsService from "../../../Services/vacationsService";
import notificationService from "../../../Services/NotifyService";
import { useNavigate } from "react-router-dom";
import appConfig from "../../../Utils/app-config";
import UserModel from "../../../Models/UserModel";
import { authStore } from "../../../Redux/AuthState";

function AddVacation(): JSX.Element {

    const { register, handleSubmit } = useForm<VacationModal>()

    const [imageFile, setImageFile] = useState<File | null>();

    const navigate = useNavigate()

    useEffect(() => {
        const user = authStore.getState().user
        if (!user) {
            notificationService.error("Don't do that")
            navigate(appConfig.vacationsRoute)
        }
        else if (user.role === 2) {
            notificationService.error("Don't do that")
            navigate(appConfig.vacationsRoute)
        }
    }, [])

    function handleFileChange(e: any) {
        const files = e.target.files;
        if (!files || !files.item(0)) return;
        setImageFile(files.item(0))
    }
    const imageSrc = useImagePreview(imageFile)

    async function send(vacation: VacationModal) {
        try {
            vacation.image = (vacation.image as unknown as FileList)[0]
            const beVacation = await vacationsService.addVacation(vacation)
            console.log(beVacation)
            notificationService.success(`Vacation has been added`)
            navigate(appConfig.vacationsRoute)
        } catch (err: any) { notificationService.error(err) }
    }
    return (
        <div className="AddVacation">
            <h3>Add Vacation</h3>
            <form onSubmit={handleSubmit(send)}>
                <label>Vacation Name :</label>
                <input type="text" required {...register('name')} />
                <label>Vacation Description :</label>
                <textarea cols={30} rows={5} required {...register('description')}></textarea>
                <label>Start Date :</label>
                <input type="date" required {...register('startDate')} />
                <label>End Date :</label>
                <input type="date" required {...register('endDate')} />
                <label>Price :</label>
                <input type="number" required step={0.01} min={0} max={10000} {...register('price')} />
                <label>Image :</label>
                <input type="file" accept="images/*" required {...register('image')} onChange={handleFileChange} />
                <div className="imagePlace">
                    {imageSrc ? <img src={imageSrc} /> : <></>}
                </div>
                <button>Send</button>
            </form>
        </div>
    )
}

export default AddVacation