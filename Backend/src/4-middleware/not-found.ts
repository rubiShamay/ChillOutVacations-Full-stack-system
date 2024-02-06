import { Request, Response, NextFunction } from "express";
import { RouteNotFound } from "../3-models/error-models";
import path from "path";


// Route not found Middleware: :
function routeNotFound(request: Request, response: Response, next: NextFunction): void {

    // Crate not found error:
    const err = new RouteNotFound(request.originalUrl)

    // Sent to catch-all
    next(err)
}

// Page not found Middleware: :
function pageNotFound(request: Request, response: Response, next: NextFunction): void {

    // Send the index of page 404
    response.sendFile(path.join(__dirname, "..", "7-frontend", "index.html"))
    
}

export {
    routeNotFound,
    pageNotFound
}
