class AppConfig {
    // Routes
    public readonly homeRoute = "/home/"
    public readonly registerRoute = "/register/"
    public readonly loginRoute = "/login/"
    public readonly vacationsRoute = "/vacations/"
    public readonly addVacationsRoute = "/vacations/addVacation/"
    public readonly updateVacationRoute = "/vacations/updateVacation/"
    public readonly dataRoute = "/vacations/dataArea/"
    public constructor(public baseUrl: string, public baseImagesUrl: string) { }

    // Url's 
    public readonly registerUrl = this.baseUrl + "/api/register/"
    public readonly loginUrl = this.baseUrl + "/api/login/"
    public readonly vacationsUrl = this.baseUrl + "/api/vacations/"
    public readonly oneVacationUrl = this.baseUrl + "/api/vacation/"
    public readonly followersUrl = this.baseUrl + "/api/followers/"
    public readonly vacationToAdminUrl = this.baseUrl + "/api/vacationsToAdmin/"
    public readonly appHost = this.baseUrl
    public readonly imagesUrl = this.baseImagesUrl
}

class DevelopmentConfig extends AppConfig {

    public constructor() {
        super("http://localhost:4000", "http://localhost:4000")
    }

}

class ProductionConfig extends AppConfig {

    public constructor() {
        super("", "http://159.203.86.176/")
    }
}

// This is not comment out ! ;
// If we're in production we must to export the ProductionConfig() if we're in development  
// const appConfig = new ProductionConfig() // for the production version
const appConfig = new DevelopmentConfig(); // for the development version  

export default appConfig