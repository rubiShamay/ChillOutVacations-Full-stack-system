import { Forbidden, Unauthorized } from "../3-models/error-models";
import RoleModel from "../3-models/role-model";
import UserModel from "../3-models/user-model";
import jwt from "jsonwebtoken"
class Cyber {

    private secretKey = "My-First-FullStack-Project-In-React-NodeJS";

    public getNewToken(user: UserModel): string {

        // Containing the user inside the container object
        const container = { user };

        // create expiration date :
        const options = { expiresIn: "3h" };

        // create token 
        const token = jwt.sign(container, this.secretKey, options)

        return token
    }

    // verify token validate :
    public verifyToken(token: string): void {
        // if no token
        if (!token) throw new Unauthorized("You are not logged in.");

        try {
            jwt.verify(token, this.secretKey)
        }
        catch (err: any) { throw new Unauthorized(err.message) }
    }

    public verifyAdmin(token: string): void {

        // verify Token
        this.verifyToken(token);

        // Get the container containing the user object
        const container = jwt.verify(token, this.secretKey) as { user: UserModel };

        // Extract the user from the container 
        const user = container.user;

        // if user not admin 
        if (user.role !== RoleModel.Admin) throw new Forbidden("You not admin");

    }
}

const cyber = new Cyber();

export default cyber;