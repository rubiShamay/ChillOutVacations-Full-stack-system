import { NextFunction, Request, Response } from "express";
import logger from "../2-utils/logger";

function activities(request: Request, response: Response, next: NextFunction) {

    const activity = `
Method : ${request.method}
Route : ${request.originalUrl}`
logger.logActivity(activity);

    next();
}

export default activities;
