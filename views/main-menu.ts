import {authMenu} from "./auth-menu";
import {profileMenu} from "./profile-menu";
import {Authorized, Unauthorized} from "../services/book-service";
import {UserClass} from "../controllers/user-controller";

const menu = require('console-menu');

export function mainMenu(): void {
    const user = UserClass.getInstance();
    const book = user.getUser() ? new Authorized() : new Unauthorized();

    menu([
        {hotkey: '1', title: 'Profile'},
        {hotkey: '2', title: 'All Books'},
        {hotkey: '3', title: 'Get a Book'},
        {separator: true},
        {hotkey: 'x', title: 'Exit'},
        {hotkey: '?', title: 'Help'},
    ], {
        header: 'Main Menu',
        border: true,
    }).then(async (item: any) => {
        if (item) {
            switch (item.hotkey) {
                case '1': {
                    if (!user.getUser()) {
                        return authMenu();
                    } else {
                        return profileMenu();
                    }
                }
                case '2': {
                    return book.getAllBooks();
                }
                case '3': {
                    return book.getBookByTitle();
                }
                case 'x': {
                    console.log('You cancelled the views.');
                    return process.exit();
                }
                default: {
                    console.log('Help Command');
                    return mainMenu();
                }
            }
        } else {
            console.log('You cancelled the views.');
            return process.exit();
        }
    })
}