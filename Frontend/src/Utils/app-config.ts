class AppConfig {

    // Url's
    public readonly registerUrl = "http://localhost:4000/api/register/"
    public readonly loginUrl = "http://localhost:4000/api/login/"
    public readonly vacationsUrl = "http://localhost:4000/api/vacations/"
    public readonly oneVacationUrl = "http://localhost:4000/api/vacation/"
    public readonly followersUrl = "http://localhost:4000/api/followers/"
    public readonly vacationToAdminUrl = "http://localhost:4000/api/vacationsToAdmin/"


    // Routes
    public readonly homeRoute = "/home/"
    public readonly registerRoute = "/register/"
    public readonly loginRoute = "/login/"
    public readonly vacationsRoute = "/vacations/"
    public readonly addVacationsRoute = "/vacations/addVacation/"
    public readonly updateVacationRoute = "/vacations/updateVacation/"
    public readonly dataRoute = "/vacations/dataArea/"
}

const appConfig = new AppConfig()

export default appConfig