import Joi from "joi";
import { UploadedFile } from "express-fileupload";
import { Validation } from "./error-models";

class VacationModel {
    public id: number;
    public name: string;
    public description: string;
    public startDate: string;
    public endDate: string;
    public price: number;
    public image: UploadedFile;
    public imageUrl: string

    public constructor(vacation: VacationModel) {
        this.id = vacation.id;
        this.name = vacation.name;
        this.description = vacation.description;
        this.startDate = vacation.startDate;
        this.endDate = vacation.endDate;
        this.price = vacation.price;
        this.imageUrl = vacation.imageUrl;
        this.image = vacation.image;
    }

    // POST schema validation
    private static postValidationSchema = Joi.object({
        id: Joi.number().forbidden(),
        name: Joi.string().required().min(2).max(50),
        description: Joi.string().required().min(2).max(500),
        startDate: Joi.date().greater('now').required(),
        endDate: Joi.date().min(Joi.ref('startDate')).required(),
        price: Joi.number().min(0).max(5000).positive(),
        image: Joi.object().required(),
        imageUrl: Joi.string().optional()
    })
    // POST function validation
    public postValidate(): void {
        const result = VacationModel.postValidationSchema.validate(this);
        if (result.error?.message) throw new Validation(result.error.message)
    }

    private static putValidationSchema = Joi.object({
        id: Joi.number().optional(),
        name: Joi.string().optional().min(2).max(50),
        description: Joi.string().optional().min(2).max(500),
        startDate: Joi.date().required(),
        endDate: Joi.date().min(Joi.ref('startDate')).required(),
        price: Joi.number().min(0).max(5000).positive(),
        image: Joi.object().optional(),
        imageUrl: Joi.string().optional()
    })

    public putValidate(): void {
        const result = VacationModel.putValidationSchema.validate(this);
        if (result.error?.message) throw new Validation(result.error.message)
    }
}

export default VacationModel