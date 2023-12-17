import { OkPacket } from "mysql";
import { fileSaver } from "uploaded-file-saver";
import appConfig from "../2-utils/app-config";
import dal from "../2-utils/dal";
import { ResourceNotFound } from "../3-models/error-models";
import VacationModel from "../3-models/vacation-model";
import fs from "fs/promises"
import os from "os"
import path from "path";

class VacationService {

    public async getAllVacations(id: number): Promise<VacationModel[]> {

        // Create query
        const sql = `
        SELECT DISTINCT V.id , 
                v.name , 
                v.description , 
                DATE_FORMAT(v.startDate, "%Y-%m-%d") as startDate , 
                DATE_FORMAT(v.endDate, "%Y-%m-%d") as endDate ,
                v.price,
                CONCAT('${appConfig.appHost}' , '/api/vacations/' ,v.ImageName) as imageUrl,
    	EXISTS(SELECT * FROM followers r WHERE r.vacationsID = F.vacationsID AND r.userID = ?) AS isFollowing,
            COUNT(F.userID) AS followersCount
        FROM vacations as V LEFT JOIN followers as F
        ON V.id = F.vacationsID
        GROUP BY id
        ORDER BY startDate`;

        // Get vacations from database
        const vacations = await dal.execute(sql, [id])

        if (!vacations) throw new ResourceNotFound(id)

        // Return
        return vacations
    }

    public async getOneVacation(id: number): Promise<VacationModel> {

        // Create query
        const sql = `
        SELECT 
            id , 
            name,
            description,
            DATE_FORMAT(startDate, "%Y-%m-%d") as startDate ,
            DATE_FORMAT(endDate, "%Y-%m-%d") as endDate,
            price,
            CONCAT('${appConfig.appHost}' , '/api/vacations/' ,ImageName) as imageUrl
        FROM vacations
        WHERE id = ?`;

        // Get vacations from database
        const vacations = await dal.execute(sql , [id])
        // Extract that vacation to single object
        const vacation = vacations[0]

        if (!vacation) throw new ResourceNotFound(id)

        // Return
        return vacation
    }

    public async addVacation(vacation: VacationModel): Promise<VacationModel> {
        // Validate
        vacation.postValidate();

        // Save Image to disk: 
        const imageName = await fileSaver.add(vacation.image);

        // SQL create SQL insert query
        const sql = `
        INSERT INTO vacations(name,description,startDate,endDate,price,ImageName)
        VALUES(? , ? , ? , ? , ? , ?)`;

        // Add vacation to database
        const info: OkPacket = await dal.execute(sql , [
            vacation.name,
            vacation.description,
            vacation.startDate,
            vacation.endDate,
            vacation.price,
            imageName
        ]);

        // Delete image from model : 
        delete vacation.image;

        // Update imageUrl :
        vacation.imageUrl = appConfig.appHost + "/api/vacations/" + imageName;

        // Set new created id to the vacation to return
        vacation.id = info.insertId;

        return vacation
    }

    public async updateVacation(vacation: VacationModel): Promise<VacationModel> {
        // Validate
        vacation.putValidate();

        // get the vacation from sql to not save the image if resource not found
        const existingVacation = await this.getExistingVacation(vacation.id);

        // throw error if resource not found
        if (!existingVacation) throw new ResourceNotFound(vacation.id);

        // Get Existing image name
        const existingImageName = await this.getExistingImageName(vacation.id);

        // update image if exists and get existing or update image name 
        const imageName = vacation.image ? await fileSaver.update(existingImageName, vacation.image) : existingImageName;

        // SQL create SQL insert query
        const sql = `
        UPDATE vacations SET 
            name  = ? , 
            description  = ? , 
            startDate  = ? , 
            endDate  = ? , 
            price  = ? , 
            ImageName  = ? 
        WHERE id = ?`;

        // Add vacation to database
        const info: OkPacket = await dal.execute(sql ,[
            vacation.name,
            vacation.description,
            vacation.startDate,
            vacation.endDate,
            vacation.price,
            imageName,
            vacation.id
        ]);

        // if id not found
        if (info.affectedRows === 0) throw new ResourceNotFound(vacation.id);

        // Delete image from model : 
        delete vacation.image;

        // Update imageUrl :
        vacation.imageUrl = appConfig.appHost + "/api/vacations/" + imageName;

        // Return vacation
        return vacation
    }

    // Get image name by vacation id:
    private async getExistingImageName(id: number): Promise<string> {
        const sql = `SELECT ImageName FROM vacations WHERE id = ?`
        const vacations = await dal.execute(sql, [id])
        const vacation = vacations[0];
        if (!vacation) return "";
        return vacation.ImageName;
    }

    // Get check if there vacation for update image :
    private async getExistingVacation(id: number): Promise<string> {
        const sql = `SELECT id FROM vacations WHERE id = ?`
        const vacations = await dal.execute(sql , [id])
        const vacation = vacations[0];
        if (!vacation) return "";
        return vacation.id;
    }

    public async deleteVacation(id: number): Promise<void> {

        // Get Existing image name
        const existingImageName = await this.getExistingImageName(id);

        // SQL create SQL insert query
        const sql = `DELETE FROM vacations WHERE id = ?`;

        // Add vacation to database
        const info: OkPacket = await dal.execute(sql , [id]);

        // Delete image from disk
        await fileSaver.delete(existingImageName)

        // if id not found
        if (info.affectedRows === 0) throw new ResourceNotFound(id);
    }

    public async getAllVacationsToAdmin(): Promise<VacationModel[]> {

        // Create query
        const sql = `
        SELECT V.name ,COUNT(F.userID) AS followersCount
        FROM vacations as V LEFT JOIN followers as F
        ON V.id = F.vacationsID
        GROUP BY id;`;

        // Get vacations from database
        const vacations = await dal.execute(sql)

        // Return
        return vacations
    }



}

const vacationsService = new VacationService();

export default vacationsService;