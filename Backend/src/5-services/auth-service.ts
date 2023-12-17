import { OkPacket } from "mysql";
import dal from "../2-utils/dal";
import RoleModel from "../3-models/role-model";
import UserModel from "../3-models/user-model";
import cyber from "../2-utils/cyber";
import CredentialModel from "../3-models/credentials-model";
import { Unauthorized, Validation } from "../3-models/error-models";

class AuthService {

    private async getExistingEmail(email: string): Promise<UserModel[]> {
        const checkSql = `SELECT * FROM users`;

        const users: UserModel[] = await dal.execute(checkSql)

        const takenUser = users.filter(u => u.email === email)

        return takenUser
    }

    public async register(user: UserModel): Promise<any> {
        // Validate :
        user.validate()

        // If user name taken :
        const checkUser = await this.getExistingEmail(user.email)

        // return takenUser and throw error :
        if (checkUser.length >= 1) throw new Validation("User Is Taken")

        // Declare user as regular user :
        user.role = RoleModel.User;

        // create sql
        const sql = `INSERT INTO users VALUES(DEFAULT , ? , ? , ? , ? , ?)`;

        // Save user
        const info: OkPacket = await dal.execute(sql, [user.firstName, user.lastName, user.email, user.password, user.role]);

        // set user id 
        user.id = info.insertId;

        // Generate token
        const token = cyber.getNewToken(user);

        // Return token : 
        return token
    }



    public async login(credentials: CredentialModel): Promise<string> {
        // Validate :
        credentials.credentialsValidate()

        // Create sql
        const sql = `SELECT * FROM users WHERE email = ? AND password = ?`

        // Save user
        const users = await dal.execute(sql , [credentials.email , credentials.password]);

        const user = users[0];

        // if user not exist
        if (!user) throw new Unauthorized("User or password no Exist")

        // Generate token
        const token = cyber.getNewToken(user);

        // Return token : 
        return token
    }
}

const authService = new AuthService();

export default authService