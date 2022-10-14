"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainMenu = void 0;
const auth_menu_1 = require("./auth-menu");
const profile_menu_1 = require("./profile-menu");
const book_service_1 = require("../services/book-service");
const user_controller_1 = require("../controllers/user-controller");
const menu = require('console-menu');
function mainMenu() {
    const user = user_controller_1.UserClass.getInstance();
    const book = user.getUser() ? new book_service_1.Authorized() : new book_service_1.Unauthorized();
    menu([
        { hotkey: '1', title: 'Profile' },
        { hotkey: '2', title: 'All Books' },
        { hotkey: '3', title: 'Get a Book' },
        { separator: true },
        { hotkey: 'x', title: 'Exit' },
        { hotkey: '?', title: 'Help' },
    ], {
        header: 'Main Menu',
        border: true,
    }).then((item) => __awaiter(this, void 0, void 0, function* () {
        if (item) {
            switch (item.hotkey) {
                case '1': {
                    if (!user.getUser()) {
                        return (0, auth_menu_1.authMenu)();
                    }
                    else {
                        return (0, profile_menu_1.profileMenu)();
                    }
                }
                case '2': {
                    return book.getAllBooks();
                }
                case '3': {
                    return book.getBookByTitle();
                }
                case 'x': {
                    console.log('You cancelled the menu.');
                    return process.exit();
                }
                default: {
                    console.log('Help Command');
                    return mainMenu();
                }
            }
        }
        else {
            console.log('You cancelled the menu.');
            return process.exit();
        }
    }));
}
exports.mainMenu = mainMenu;
