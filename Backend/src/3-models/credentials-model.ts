import Joi from "joi";
import { Validation } from "./error-models";

class CredentialModel {
    public email: string;
    public password: string

    public constructor(credentials: CredentialModel) {
        this.email = credentials.email
        this.password = credentials.password
    }

    // validation schema
    private static postValidationSchema = Joi.object({
        email: Joi.string().required().min(2).max(50),
        password: Joi.string().required().min(2).max(50),
    })

    // validation function
    public credentialsValidate(): void {
        const result = CredentialModel.postValidationSchema.validate(this);
        if (result.error?.message) throw new Validation(result.error.message)
    }
}

export default CredentialModel