import Book from "../models/Book";
import {activity, UserClass} from "../controllers/user-controller";
import menus from "../views/menus";
import {IUser} from "../models/User";
const prompt = require('prompt-sync')();

interface BookServiceI {
    getAllBooks(): void;
    getBookByTitle(): void;
    addBook(): void;
}

class BookService implements BookServiceI {
    async getAllBooks(): Promise<void> {
        const books = await Book.find();
        books.forEach((book, i) => {
            console.log(`${i + 1}) ${book.title}. ${book.author} [${book.year}]`);
        });
        menus.mainMenu();
    }

    async getBookByTitle(): Promise<void> {
        const title = prompt('Book Title: ');

        const book = await Book.findOne({title: title});
        if (book) {
            await menus.bookMenu(book);
        } else {
            console.log('Book with this title doesnt exists!');
            menus.mainMenu();
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
            return menus.profileMenu();
        }

        return menus.bookMenu(newBook);
    }

    validate(): IUser | null {
        const user = UserClass.getInstance();
        return user.getUser();
    }
}

export class BookServiceProxy implements BookServiceI {
    async addBook(): Promise<void> {
        const bookService = new BookService();
        const user = bookService.validate();
        if (!user) {
            console.log('You are not authorized!');
            return menus.mainMenu();
        }
        activity.setActivity({user, activity: 'addBook'});
        return bookService.addBook();
    }

    async getAllBooks(): Promise<void> {
        const bookService = new BookService();
        const user = bookService.validate();
        if (!user) {
            console.log('You are not authorized!');
            return menus.mainMenu();
        }
        activity.setActivity({user, activity: 'getAllBooks'});
        return bookService.getAllBooks();
    }

    async getBookByTitle(): Promise<void> {
        const bookService = new BookService();
        const user = bookService.validate();
        if (!user) {
            console.log('You are not authorized!');
            return menus.mainMenu();
        }
        activity.setActivity({user, activity: 'getBookByTitle'});
        return bookService.getBookByTitle();
    }

}