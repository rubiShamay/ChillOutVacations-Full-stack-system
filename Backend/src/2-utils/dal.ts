import mysql, { MysqlError } from "mysql"
import appConfig from "./app-config";

const connection = mysql.createPool({
    // database computer address
    host: appConfig.mysqlHost,
    // database username
    user: appConfig.mysqlUser,
    // database password
    password: appConfig.mysqlPassword,
    // database  name
    database: appConfig.mysqlDatabase

});

function execute(sql: string, values?: any[]): Promise<any> {
    return new Promise<any>((resolve, reject) => {
        connection.query(sql, values, (err: MysqlError, result: any) => {
            if (err) {
                reject(err);
                return
            }
            resolve(result)
        });
    });
}

export default {
    execute
};