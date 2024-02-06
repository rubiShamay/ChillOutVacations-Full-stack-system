import dotenv from "dotenv"
dotenv.config()

abstract class AppConfig {
    public readonly port = process.env.PORT;
    public readonly mysqlHost = process.env.MYSQL_HOST;
    public readonly mysqlUser = process.env.MYSQL_USER;
    public readonly mysqlPassword = process.env.MYSQL_PASSWORD;
    public readonly mysqlDatabase = process.env.MYSQL_DATABASE;
    public constructor(public baseImageUrl: string) { }
}

class DevelopmentConfig extends AppConfig {
    // public baseImageUrl = ""
    public readonly appHost = "http://localhost:4000";
    public isDevelopment = true;
    public isProduction = false;
    // The Local Domain 
    public constructor(){
        super("http://localhost:4000")
    }
}

class ProductionConfig extends AppConfig {
    public readonly appHost = "http://localhost:5000";
    public isDevelopment = false;
    public isProduction = true;
    // The Domain of Digital Ocean
    public constructor(){
        super("http://159.203.86.176/")
    }
}

const appConfig = (process.env.NODE_ENV === "production") ? new ProductionConfig() : new DevelopmentConfig();

export default appConfig