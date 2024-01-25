import { useForm } from "react-hook-form"
import "./UpdateVacation.css"
import VacationModal from "../../../Models/VacationModel"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import notificationService from "../../../Services/NotifyService"
import useImagePreview from "../../../Utils/UseImagePreview"
import vacationsService from "../../../Services/vacationsService"
import appConfig from "../../../Utils/app-config"
import UserModel from "../../../Models/UserModel"
import { authStore } from "../../../Redux/AuthState"

function UpdateVacation(): JSX.Element {

    const { register, handleSubmit, setValue } = useForm<VacationModal>()

    const param = useParams()
    const id = +param.prop;

    const navigate = useNavigate()

    const [feVacation, setFeVacation] = useState<VacationModal>();

    const [imageFile, SetImageFile] = useState<File | null>();

    useEffect(() => {

        const user = authStore.getState().user
        if (!user) {
            notificationService.error("You must be login.")
            navigate(appConfig.loginRoute)
        } else if (user.role === 2) {
            notificationService.error("You are not admin , Don't do that.")
            navigate(appConfig.vacationsRoute)
        } else if (user.role === 1) {
            vacationsService.getOneVacation(id)
                .then(vacation => {
                    setValue("name", vacation.name)
                    setValue("name", vacation.name)
                    setValue("description", vacation.description)
                    setValue("startDate", vacation.startDate)
                    setValue("endDate", vacation.endDate)
                    setValue("price", vacation.price)
                    setValue("imageUrl", vacation.imageUrl)
                    setFeVacation(vacation)
                })
                .catch((err) => notificationService.error(err))
        }

    }, [])

    async function update(vacation: VacationModal) {
        try {
            vacation.id = id
            vacation.image = (vacation.image as unknown as FileList)[0]
            const beVacation = await vacationsService.updateVacation(vacation)
            notificationService.success(`Vacation ${beVacation.id} has been update`)
            navigate(appConfig.vacationsRoute)
        }
        catch (err: any) { notificationService.error(err) }
    }

    const imageSrc = useImagePreview(imageFile)

    function handleFileChange(e: any) {
        const files = e.target.files;
        if (!files || !files.item(0)) return
        SetImageFile(files.item(0))
    }


    return (
        <div className="UpdateVacation">
            <h3>Update Vacation</h3>
            <form onSubmit={handleSubmit(update)}>
                <label>Vacation Name :</label>
                <input type="text" {...register('name')} />
                <label>Vacation Description :</label>
                <textarea cols={30} rows={5} {...register('description')}></textarea>
                <label>Start Date :</label>
                <input type="date" {...register('startDate')} />
                <label>End Date :</label>
                <input type="date" {...register('endDate')} />
                <label>Price :</label>
                <input type="number" step={0.01} {...register('price')} />
                <label>Image :</label>
                <input type="file" accept="images/*" {...register('image')} onChange={handleFileChange} />
                <div className="imagePlace">
                    {imageSrc ? <img src={imageSrc} /> : <img src={feVacation?.imageUrl} />}
                </div>
                <button>Update</button>
            </form>
        </div>
    )
}

export default UpdateVacation