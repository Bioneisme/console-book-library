import {mainMenu} from "./menu/main-menu";
import * as mongoose from "mongoose";

const start = async () => {
    await mongoose.connect('mongodb://localhost:27017/test', {});

    mainMenu();
}

start();