import { OkPacket } from "mysql";
import dal from "../2-utils/dal";
import { ResourceNotFound } from "../3-models/error-models";
import FollowersModel from "../3-models/followers-model";

class FollowersService {

    public async addVacation(follower: FollowersModel): Promise<FollowersModel> {

        const checkUser = await this.checkUsers(follower.userId)
        if (!checkUser) throw new ResourceNotFound(follower.userId)

        const checkVacation = await this.checkVacation(follower.vacationId)
        if (!checkVacation) throw new ResourceNotFound(follower.vacationId)

        const sql = `INSERT INTO followers(userID, vacationsID) VALUES (?,?)`;

        const info: OkPacket = await dal.execute(sql, [follower.userId, follower.vacationId]);

        if (info.affectedRows === 0) throw new ResourceNotFound(follower.userId);

        return follower

    }

    public async deleteVacation(follower: FollowersModel): Promise<void> {

        const checkUser = await this.checkUsers(follower.userId)
        if (!checkUser) throw new ResourceNotFound(follower.userId)

        const checkVacation = await this.checkVacation(follower.vacationId)
        if (!checkVacation) throw new ResourceNotFound(follower.vacationId)

        const sql = `DELETE FROM followers WHERE userID = ? AND vacationsID = ?`

        const info: OkPacket = await dal.execute(sql , [follower.userId , follower.vacationId]);

        if (info.affectedRows === 0) throw new ResourceNotFound(follower.userId);
    }

    public async checkUsers(id: number): Promise<string> {
        const sql = `SELECT id FROM users WHERE id = ?`
        const users = await dal.execute(sql,[id])
        const user = users[0];
        if (!user) return "";
        return user.id;
    }

    public async checkVacation(id: number): Promise<string> {
        const sql = `SELECT id FROM vacations WHERE id = ?`
        const vacations = await dal.execute(sql , [id])
        const vacation = vacations[0];
        if (!vacation) return "";
        return vacation.id;
    }

}

const followersService = new FollowersService();

export default followersService;