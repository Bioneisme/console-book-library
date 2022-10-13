import {mainMenu} from "./main-menu";
import {IBook} from "../models/Book";

const menu = require('console-menu');

export async function bookMenu(book: IBook): Promise<void> {
    menu([
        {hotkey: '0', title: `ID: ${book.id}`},
        {hotkey: '1', title: `Title: ${book.title}`},
        {hotkey: '2', title: `Author: ${book.author}`},
        {hotkey: '3', title: `Year: ${book.year}`},
        {hotkey: '4', title: `Description: ${book.description}`},
        {hotkey: '5', title: 'Back'},
        {separator: true},
        {hotkey: '?', title: 'Help'},
    ], {
        header: 'Profile Menu',
        border: true,
    }).then((item: any) => {
        if (item) {
            switch (item.hotkey) {
                case '5': {
                    return mainMenu();
                }
                case '?': {
                    console.log('Help Command');
                    return bookMenu(book);
                }
                default: {
                    return bookMenu(book);
                }
            }
        } else {
            console.log('You cancelled the menu.');
        }
    })
}