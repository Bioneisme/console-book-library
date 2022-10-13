import {authMenu} from "./auth-menu";
import {userID} from "../controllers/user-controller";
import {profileMenu} from "./profile-menu";
import {Authorized, Unauthorized} from "../services/book-service";

const menu = require('console-menu');

export function mainMenu(): void {
    const book = userID ? new Authorized() : new Unauthorized();

    menu([
        {hotkey: '1', title: 'Profile'},
        {hotkey: '2', title: 'All Books'},
        {hotkey: '3', title: 'Get a Book'},
        {separator: true},
        {hotkey: '?', title: 'Help'},
    ], {
        header: 'Main Menu',
        border: true,
    }).then(async (item: any) => {
        if (item) {
            switch (item.hotkey) {
                case '1': {
                    if (!userID) {
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
                default: {
                    console.log('Help Command');
                    return mainMenu();
                }
            }
        } else {
            console.log('You cancelled the menu.');
        }
    })
}