import { Request, Response, NextFunction } from "express";
import { RouteNotFound } from "../3-models/error-models";


// Route not found Middleware: :
function routeNotFound(request: Request, response: Response, next: NextFunction): void {
    
    // Crate not found error:
    const err = new RouteNotFound(request.originalUrl)
    
    // Sent to catch-all
    next(err)
}

export default routeNotFound
