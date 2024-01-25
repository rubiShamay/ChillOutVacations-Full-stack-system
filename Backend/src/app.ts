import cors from "cors";
import express  from "express";
import expressFileUpload from "express-fileupload";
import expressRateLimit from "express-rate-limit";
import path from "path";
import { fileSaver } from "uploaded-file-saver";
import appConfig from "./2-utils/app-config";
import catchAll from "./4-middleware/catch-all";
import routeNotFound from "./4-middleware/not-found";
import authController from "./6-controllers/auth-controller";
import vacationsController from "./6-controllers/vacation-controller";
import followersController from "./6-controllers/followers-controller";
import sanitize from "./4-middleware/sanitize";
import activities from "./4-middleware/activities";
import helmet from "helmet";




// Creating server
const server = express();

// 
server.use(expressRateLimit({
    windowMs:1000 , // Millisecond 
    limit : 200 // How many request one user can perform
}))

// Allow CORS access:
server.use(cors());

// Using helmet to sanitize bad header in request body:
// server.use(helmet());
// Not in action cus need upload images ////////

// Set the images folder for the fileSaver library:
fileSaver.config(path.join(__dirname, "1-assets", "images"));

// Creating a request.body object containing the request body data:
server.use(express.json());

// Give to express all our project files:
// server.use(express.static(path.join(__dirname, "7-frontend")))

// Create a request.files object containing the files sent by front:
server.use(expressFileUpload());

// Log every request
server.use(activities); 

// Sanitize the request.body and remove tags: 
server.use(sanitize);

// Connect our controllers
server.use("/api", vacationsController, authController, followersController);

// Route not found :
server.use(routeNotFound)

// Catch all middleware :
server.use(catchAll)

// Running server
server.listen(appConfig.port, () => { console.log(`Listening to http//:localhost:${appConfig.port}`) });