class FollowersModel {
    public userId: number;
    public vacationId: number

    public constructor(followers: FollowersModel) {
        this.userId = followers.userId
        this.vacationId = followers.vacationId
    }
}


export default FollowersModel