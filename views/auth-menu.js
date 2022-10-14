"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMenu = void 0;
const main_menu_1 = require("./main-menu");
const user_controller_1 = __importDefault(require("../controllers/user-controller"));
const menu = require('console-menu');
function authMenu() {
    menu([
        { hotkey: '1', title: 'Sign In' },
        { hotkey: '2', title: 'Sign Up' },
        { hotkey: '3', title: 'Back' },
        { separator: true },
        { hotkey: '?', title: 'Help' },
    ], {
        header: 'Auth Menu',
        border: true,
    }).then((item) => {
        if (item) {
            switch (item.hotkey) {
                case '1': {
                    return user_controller_1.default.signIn();
                }
                case '2': {
                    return user_controller_1.default.signUp();
                }
                case '3': {
                    return (0, main_menu_1.mainMenu)();
                }
                default: {
                    console.log('Help Command');
                    return authMenu();
                }
            }
        }
        else {
            console.log('You cancelled the menu.');
            return process.exit();
        }
    });
}
exports.authMenu = authMenu;
