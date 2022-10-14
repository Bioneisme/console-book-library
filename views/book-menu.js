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
exports.bookMenu = void 0;
const main_menu_1 = require("./main-menu");
const menu = require('console-menu');
function bookMenu(book) {
    return __awaiter(this, void 0, void 0, function* () {
        menu([
            { hotkey: '0', title: `ID: ${book.id}` },
            { hotkey: '1', title: `Title: ${book.title}` },
            { hotkey: '2', title: `Author: ${book.author}` },
            { hotkey: '3', title: `Year: ${book.year}` },
            { hotkey: '4', title: `Description: ${book.description}` },
            { hotkey: '5', title: 'Back' },
            { separator: true },
            { hotkey: '?', title: 'Help' },
        ], {
            header: 'Book Menu',
            border: true,
        }).then((item) => {
            if (item) {
                switch (item.hotkey) {
                    case '5': {
                        return (0, main_menu_1.mainMenu)();
                    }
                    case '?': {
                        console.log('Help Command');
                        return bookMenu(book);
                    }
                    default: {
                        return bookMenu(book);
                    }
                }
            }
            else {
                console.log('You cancelled the menu.');
                return process.exit();
            }
        });
    });
}
exports.bookMenu = bookMenu;
