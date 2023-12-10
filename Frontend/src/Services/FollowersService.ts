import axios from "axios"
import FollowersModel from "../Models/FollowersModel"
import appConfig from "../Utils/app-config"
import { VacationActionType, VacationsAction, vacationsStore } from "../Redux/VacationsState";
import { FlowFlags } from "typescript";

class FollowersService {

    public async addFollower(follower: FollowersModel): Promise<FollowersModel> {
        const response = await axios.post(appConfig.followersUrl, follower)
        const beFollowers = response.data;
        const action: VacationsAction = { type: VacationActionType.AddFollower, payload: beFollowers }
        vacationsStore.dispatch(action)
        return beFollowers
    }

    public async deleteFollower(user: number, vacation: number): Promise<void> {
        await axios.delete(appConfig.followersUrl + user + "/" + vacation)
        const action: VacationsAction = { type: VacationActionType.RemoveFollower, payload: vacation }
        vacationsStore.dispatch(action)
    }

}

const followersService = new FollowersService()

export default followersService