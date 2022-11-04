import {UserClass} from "../controllers/user-controller";
import authService from "../services/auth-service";
import {BookServiceProxy} from "../services/book-service";
import menus from "./menus";
import {help} from "../utils/commands";

const menu = require('console-menu');

export async function profileMenu(): Promise<void> {
    const user = UserClass.getInstance();
    const userEntity = user.getUser();
    const book = new BookServiceProxy();

    menu([
        {hotkey: '1', title: `Username: ${userEntity?.username}`},
        {hotkey: '2', title: `My books`},
        {hotkey: '3', title: `Add a new book`},
        {hotkey: '4', title: `Delete a book`},
        {hotkey: '5', title: 'Logout'},
        {hotkey: '6', title: 'Back'},
        {separator: true},
        {hotkey: '?', title: 'Help'},
    ], {
        header: 'Profile Menu',
        border: true,
    }).then((item: any) => {
        if (item) {
            switch (item.hotkey) {
                case '2': {
                    return book.myBooks();
                }
                case '3': {
                    return book.addBook();
                }
                case '4': {
                    return book.deleteBook();
                }
                case '5': {
                    authService.logout();
                    return menus.authMenu();
                }
                case '6': {
                    return menus.mainMenu();
                }
                case '?': {
                    console.log(help);
                    return profileMenu();
                }
                default: {
                    return profileMenu();
                }
            }
        } else {
            console.log('You cancelled the views.');
            return process.exit();
        }
    })
}