import {mainMenu} from "./views/main-menu";
import * as mongoose from "mongoose";
import {UserClass} from "./controllers/user-controller";

const start = async () => {
    await mongoose.connect('mongodb://localhost:27017/test', {});
    UserClass.getInstance();

    mainMenu();
}

start();