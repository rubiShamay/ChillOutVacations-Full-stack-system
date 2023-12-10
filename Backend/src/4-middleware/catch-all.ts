import { Request, Response, NextFunction } from "express";
import CodeStatus from "../3-models/status-codes";


// Middleware for logging ant request on the console :
function catchAll(err: any, request: Request, response: Response, next: NextFunction): void {

    // Log error:
    console.log(`Error: ${err.message}`);

    // Crate error status"
    const status = err.status ? err.status : CodeStatus.InternalServerError;
    
    // Response the error back the front :
    response.status(status).send(err.message)
    
}

export default catchAll