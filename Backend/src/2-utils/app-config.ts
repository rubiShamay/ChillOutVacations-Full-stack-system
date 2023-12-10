class AppConfig {
    public readonly port = 4000;
    public readonly mysqlHost = "localhost";
    public readonly mysqlUser = "root";
    public readonly mysqlPassword = "";
    public readonly mysqlDatabase = "vacations";
    public readonly appHost = "http://localhost:" + this.port;
}

const appConfig = new AppConfig()

export default appConfig