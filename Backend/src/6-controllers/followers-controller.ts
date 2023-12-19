import express, { NextFunction, Request, Response } from "express";
import CredentialModel from "../3-models/credentials-model";
import CodeStatus from "../3-models/status-codes";
import UserModel from "../3-models/user-model";
import authService from "../5-services/auth-service";
import dal from "../2-utils/dal";
import followersService from "../5-services/followers-service";
import FollowersModel from "../3-models/followers-model"


const router = express.Router();


router.get("/followers", async (request: Request, response: Response, next: NextFunction) => {
    try {
        response.status(CodeStatus.Created).send("addedFollower")
    } catch (err: any) { next(err) }
});



// POST http://localhost:4000/api/followers
router.post("/followers/:userId/:vacationId", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const user = +request.params.userId
        const vacationId = +request.params.vacationId
        const follower = { userId: user, vacationId: vacationId }
        const followerToAdd = new FollowersModel(follower)
        const addedFollower = await followersService.addVacation(followerToAdd)
        response.status(CodeStatus.Created).json(addedFollower)

    } catch (err: any) { next(err) }
});

// DELETE http://localhost:4000/api/followers
router.delete("/followers/:userId/:vacationId", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const user = +request.params.userId
        const vacationId = +request.params.vacationId
        const follower = { userId: user, vacationId: vacationId }
        const followerToDelete = new FollowersModel(follower)
        await followersService.deleteVacation(followerToDelete)
        response.sendStatus(CodeStatus.NoContent)

    } catch (err: any) { next(err) }
});

export default router