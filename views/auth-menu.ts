import UserController from "../controllers/user-controller";
import menus from "./menus";
import {help} from "../utils/commands";

const menu = require('console-menu');

export function authMenu(): void {
    menu([
        {hotkey: '1', title: 'Sign In'},
        {hotkey: '2', title: 'Sign Up'},
        {hotkey: '3', title: 'Back'},
        {separator: true},
        {hotkey: '?', title: 'Help'},
    ], {
        header: 'Auth Menu',
        border: true,
    }).then((item: any) => {
        if (item) {
            switch (item.hotkey) {
                case '1': {
                    return UserController.signIn();
                }
                case '2': {
                    return UserController.signUp();
                }
                case '3': {
                    return menus.mainMenu();
                }
                default: {
                    console.log(help);
                    return authMenu();
                }
            }
        } else {
            console.log('You cancelled the views.');
            return process.exit();
        }
    })
}