// import dotenv from "dotenv"
// dotenv.config()

class AppConfig {
    // Routes
    public readonly homeRoute = "/home/"
    public readonly registerRoute = "/register/"
    public readonly loginRoute = "/login/"
    public readonly vacationsRoute = "/vacations/"
    public readonly addVacationsRoute = "/vacations/addVacation/"
    public readonly updateVacationRoute = "/vacations/updateVacation/"
    public readonly dataRoute = "/vacations/dataArea/"
}

class DevelopmentConfig extends AppConfig {

    // Url's for developers
    public readonly registerUrl = "http://localhost:4000/api/register/"
    public readonly loginUrl = "http://localhost:4000/api/login/"
    public readonly vacationsUrl = "http://localhost:4000/api/vacations/"
    public readonly oneVacationUrl = "http://localhost:4000/api/vacation/"
    public readonly followersUrl = "http://localhost:4000/api/followers/"
    public readonly vacationToAdminUrl = "http://localhost:4000/api/vacationsToAdmin/"
    public readonly appHost = "http://localhost:4000"

}

class ProductionConfig extends AppConfig {
    // Url's for production (Docker and could)
    public readonly registerUrl = "http://localhost:5000/api/register/"
    public readonly loginUrl = "http://localhost:5000/api/login/"
    public readonly vacationsUrl = "http://localhost:5000/api/vacations/"
    public readonly oneVacationUrl = "http://localhost:5000/api/vacation/"
    public readonly followersUrl = "http://localhost:5000/api/followers/"
    public readonly vacationToAdminUrl = "http://localhost:5000/api/vacationsToAdmin/"
    public readonly appHost = "http://localhost:5000"
}

const appConfig = new ProductionConfig() // for the production version
// const appConfig = new DevelopmentConfig(); // for the development version  

export default appConfig