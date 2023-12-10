import cors from "cors";
import express from "express";
import expressFileUpload from "express-fileupload";
import path from "path";
import { fileSaver } from "uploaded-file-saver";
import appConfig from "./2-utils/app-config";
import catchAll from "./4-middleware/catch-all";
import routeNotFound from "./4-middleware/route-not-found";
import authController from "./6-controllers/auth-controller";
import vacationsController from "./6-controllers/vacation-controller";
import followersController from "./6-controllers/followers-controller";

// Creating server
const server = express();

// Allow CORS access :
server.use(cors());

// Set the images folder for the fileSaver library
fileSaver.config(path.join(__dirname , "1-assets" , "images"));

// Creating a request.body object containing the request body data  
server.use(express.json());

// Create a request.files object containing the files sent by front :
server.use(expressFileUpload());

// Connect our controllers
server.use("/api", vacationsController, authController,followersController);

// Route not found :
server.use(routeNotFound)

// Catch all middleware :
server.use(catchAll)

// Running server
server.listen(appConfig.port, () => { console.log(`Listening to http//:localhost: ${appConfig.port}`) });