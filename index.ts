import {mainMenu} from "./views/main-menu";
import * as mongoose from "mongoose";
import {UserClass} from "./controllers/user-controller";
import {DB_URL} from "./utils/config";

const start = async () => {
    await mongoose.connect(DB_URL, {});
    UserClass.getInstance();

    mainMenu();
}

start();