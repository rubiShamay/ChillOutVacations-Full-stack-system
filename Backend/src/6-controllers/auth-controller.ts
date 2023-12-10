import express, { NextFunction, Request, Response } from "express";
import CredentialModel from "../3-models/credentials-model";
import CodeStatus from "../3-models/status-codes";
import UserModel from "../3-models/user-model";
import authService from "../5-services/auth-service";


const router = express.Router();

// POST http://localhost:4000/api/register
router.post("/register", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const user = new UserModel(request.body)

        const token = await authService.register(user)
        
        response.status(CodeStatus.Created).json(token)

    } catch (err: any) { next(err) }
});

// POST http://localhost:4000/api/login
router.post("/login", async (request: Request, response: Response, next: NextFunction) => {
    try {

        const credential = new CredentialModel(request.body)

        const token = await authService.login(credential)
        
        response.json(token)

    } catch (err: any) { next(err) }
});

export default router