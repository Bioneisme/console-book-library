import {authMenu} from "./auth-menu";
import {bookMenu} from "./book-menu";
import {mainMenu} from "./main-menu";
import {profileMenu} from "./profile-menu";
import {IBook} from "../models/Book";

export default new class Menus {
    authMenu() {
        return authMenu();
    }

    bookMenu(book: IBook) {
        return bookMenu(book);
    }

    mainMenu() {
        return mainMenu();
    }

    profileMenu() {
        return profileMenu();
    }
}