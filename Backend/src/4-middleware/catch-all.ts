import { Request, Response, NextFunction } from "express";
import CodeStatus from "../3-models/status-codes";
import appConfig from "../2-utils/app-config";


// Middleware for logging ant request on the console :
function catchAll(err: any, request: Request, response: Response, next: NextFunction): void {

    // Log error:
    console.log(`Error: ${err.message}`);

    // Crate error status
    const status =  err.status ||  CodeStatus.InternalServerError;
    
    // do not return the crash error in production:
    const message = appConfig.isProduction && status >= 500 ? "Some error, please try again." : err.message;
    
    // Response the error back the front :
    response.status(status).send(message)
    
}

export default catchAll