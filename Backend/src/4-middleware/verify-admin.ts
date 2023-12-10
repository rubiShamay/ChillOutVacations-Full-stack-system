import { NextFunction, Request, Response } from "express";
import cyber from "../2-utils/cyber";


// Verify admin role middleware :
function verifyAdmin(request: Request, response: Response, next: NextFunction): void {

    // Header :
    // Authorization : "Bearer the-token" :

    // Take Authorization header :
    const authorization = request.header("authorization"); // Bearer the-token

    // Extract the token :
    const token = authorization?.substring(7);

    // Verify :
    cyber.verifyAdmin(token)

    // All is good :
    next(); 

}

export default verifyAdmin