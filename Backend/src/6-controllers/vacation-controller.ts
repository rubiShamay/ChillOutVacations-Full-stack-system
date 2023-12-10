import express, { NextFunction, Request, Response } from "express";
import vacationsService from "../5-services/vacationsService";
import VacationModel from "../3-models/vacation-model";
import CodeStatus from "../3-models/status-codes";
import { fileSaver } from "uploaded-file-saver";
import verifyToken from "../4-middleware/verify-token";
import verifyAdmin from "../4-middleware/verify-admin";

const router = express.Router();

// GET http://localhost:4000/api/vacations
// Get All vacations
router.get("/vacations/:id([0-9]+)", verifyToken, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id = +request.params.id;
        const vacations = await vacationsService.getAllVacations(id);
        response.json(vacations)
    } catch (err: any) { next(err) }
});
// ******************************************************************************************************************
// GET http://localhost:4000/api/vacation/:id
// Get One vacation
router.get("/vacation/:id([0-9]+)", verifyToken, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id = +request.params.id
        const vacation = await vacationsService.getOneVacation(id);
        response.json(vacation)
    } catch (err: any) { next(err) }
});
// ******************************************************************************************************************

// POST http://localhost:4000/api/vacations
// add One vacation
router.post("/vacations", verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        request.body.image = request.files?.image; // Set uploaded image
        const vacation = new VacationModel(request.body);
        const addedVacation = await vacationsService.addVacation(vacation)
        response.status(CodeStatus.Created).json(addedVacation)
    } catch (err: any) { next(err) }
});


// PUT http://localhost:4000/api/vacations/:id
// Update vacation
router.put("/vacations/:id([0-9]+)", verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        request.body.id = +request.params.id
        request.body.image = request.files?.image; // Set uploaded image
        const vacation = new VacationModel(request.body);
        const updateVacation = await vacationsService.updateVacation(vacation)
        response.status(CodeStatus.Created).json(updateVacation)
    } catch (err: any) { next(err) }
});

// DELETE http://localhost:4000/api/vacations/:id
// Delete vacation
router.delete("/vacations/:id([0-9]+)", verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id = +request.params.id
        await vacationsService.deleteVacation(id)
        response.sendStatus(CodeStatus.NoContent)
    } catch (err: any) { next(err) }
});

// GET
// http://localhost:4000/api/vacations/1e6c42b1-f613-477c-b8a1-d727af477375.webp
// http://localhost:4000/api/vacations/:imageName
router.get("/vacations/:imageName", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const imageName = request.params.imageName;
        const absolutePath = fileSaver.getFilePath(imageName)
        response.sendFile(absolutePath);
    } catch (err: any) { next(err) }
});

// http://localhost:4000/api/vacationsToAdmin/
router.get("/vacationsToAdmin", verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const allVacations = await vacationsService.getAllVacationsToAdmin()
        response.json(allVacations);
    } catch (err: any) { next(err) }
});



export default router