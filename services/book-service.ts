import {mainMenu} from "../menu/main-menu";
import Book from "../models/Book";
import {bookMenu} from "../menu/book-menu";
const prompt = require('prompt-sync')();

interface BookService {
    getAllBooks(): void;

    getBookByTitle(): void;
}

export class Unauthorized implements BookService {
    getAllBooks(): void {
        console.log('You are not authorized!');
        mainMenu();
    }

    getBookByTitle(): void {
        console.log('You are not authorized!');
        mainMenu();
    }

}

export class Authorized implements BookService {
    async getAllBooks(): Promise<void> {
        const books = await Book.find();
        books.forEach((book, i) => {
            console.log(`${i + 1}) ${book.title}. ${book.author} [${book.year}]`);
        });
        mainMenu();
    }

    async getBookByTitle(): Promise<void> {
        const title = prompt('Book Title: ');

        const book = await Book.findOne({title: title});
        if (book) {
            await bookMenu(book);
        } else {
            console.log('Book with this title doesnt exists!');
            mainMenu();
        }
    }

}