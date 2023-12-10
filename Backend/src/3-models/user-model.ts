import Joi from "joi";
import RoleModel from "./role-model"
import { Validation } from "./error-models";

class UserModel {
    public id: number;
    public firstName: string;
    public lastName: string;
    public email: string;
    public password: string
    public role : RoleModel;

    public constructor(user: UserModel) {
        this.id = user.id
        this.firstName = user.firstName
        this.lastName = user.lastName
        this.email = user.email
        this.password = user.password
        this.role = user.role
    }

    // Post validation schema
    private static validationSchema = Joi.object({
        id: Joi.number().forbidden(),
        firstName: Joi.string().required().min(2).max(50),
        lastName: Joi.string().required().min(2).max(50),
        email: Joi.string().email().required().min(2).max(50),
        password: Joi.string().required().min(4).max(50),
        role: Joi.number().optional()
    })

    // POST validation function
    public validate(): void {
        const result = UserModel.validationSchema.validate(this);
        if (result.error?.message) throw new Validation(result.error.message)
    }
}

export default UserModel