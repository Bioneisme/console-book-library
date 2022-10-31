import {IBook} from "../models/Book";
import menus from "./menus";
import {help} from "../utils/commands";

const menu = require('console-menu');

export async function bookMenu(book: IBook): Promise<void> {
    menu([
        {hotkey: '0', title: `ID: ${book.id}`},
        {hotkey: '1', title: `Title: ${book.title}`},
        {hotkey: '2', title: `Author: ${book.author}`},
        {hotkey: '3', title: `Year: ${book.year}`},
        {hotkey: '4', title: `Description: ${book.description}`},
        {hotkey: '5', title: `URL: ${book.url}`},
        {hotkey: '6', title: 'Back'},
        {separator: true},
        {hotkey: '?', title: 'Help'},
    ], {
        header: 'Book Menu',
        border: true,
    }).then((item: any) => {
        if (item) {
            switch (item.hotkey) {
                case '6': {
                    return menus.mainMenu();
                }
                case '?': {
                    console.log(help);
                    return bookMenu(book);
                }
                default: {
                    return bookMenu(book);
                }
            }
        } else {
            console.log('You cancelled the views.');
            return process.exit();
        }
    })
}