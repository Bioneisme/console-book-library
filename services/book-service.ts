import {mainMenu} from "../views/main-menu";
import Book from "../models/Book";
import {bookMenu} from "../views/book-menu";
import {UserClass} from "../controllers/user-controller";
import {profileMenu} from "../views/profile-menu";
const prompt = require('prompt-sync')();

interface BookService {
    getAllBooks(): void;
    getBookByTitle(): void;
    addBook(): void;
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

    addBook(): void {
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

    async addBook(): Promise<void> {
        const user = UserClass.getInstance();
        const author = user.getUser()?.username;
        const title = prompt('Book Title: ');
        const year = prompt('Year of release: ');
        const description = prompt('Description: ');

        const newBook = await Book.create({
            title,
            author,
            year,
            description
        });

        if (!newBook) {
            console.log('An error occurred while creating the book');
            return profileMenu();
        }

        return bookMenu(newBook);
    }
}