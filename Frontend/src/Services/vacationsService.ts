import axios from "axios"
import VacationModal from "../Models/VacationModel"
import appConfig from "../Utils/app-config"
import { VacationActionType, VacationsAction, vacationsStore } from "../Redux/VacationsState"

class VacationsService {

    public async getAllVacations(prop: number): Promise<VacationModal[]> {
        let vacations = vacationsStore.getState().vacations;
        if (vacations.length === 0) {
            const response = await axios.get(appConfig.vacationsUrl + prop)
            vacations = response.data;
            const action: VacationsAction = { type: VacationActionType.SetVacation, payload: vacations }
            vacationsStore.dispatch(action)
        }
        return vacations
    }
    public async getOneVacation(prop: number): Promise<VacationModal> {
        const response = await axios.get(appConfig.oneVacationUrl + prop)
        const vacation = response.data;
        const action: VacationsAction = { type: VacationActionType.GetOneVacation, payload: vacation }
        vacationsStore.dispatch(action)
        return vacation
    }
    public async addVacation(vacation: VacationModal): Promise<VacationModal> {
        const options = { headers: { "Content-Type": "multipart/form-data" } }
        const response = await axios.post(appConfig.vacationsUrl, vacation, options)
        const beVacation = response.data;
        const action: VacationsAction = { type: VacationActionType.AddVacation, payload: beVacation }
        vacationsStore.dispatch(action)
        return beVacation
    }
    public async updateVacation(vacation: VacationModal): Promise<VacationModal> {
        const options = { headers: { "Content-Type": "multipart/form-data" } }
        const response = await axios.put(appConfig.vacationsUrl + vacation.id, vacation, options)
        const updateVacation = response.data;
        const action: VacationsAction = { type: VacationActionType.UpdateVacation, payload: updateVacation }
        vacationsStore.dispatch(action)
        return updateVacation
    }
    public async deleteVacation(id: number): Promise<void> {
        await axios.delete(appConfig.vacationsUrl + id)
        const action: VacationsAction = { type: VacationActionType.DeleteVacation, payload: id }
        vacationsStore.dispatch(action)
    }
    public async getAllVacationsToAdmin(): Promise<any> {
        const response = await axios.get(appConfig.vacationToAdminUrl)
        const vacations = response.data;
        return vacations
    }

}

const vacationsService = new VacationsService()

export default vacationsService