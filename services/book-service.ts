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

        return menus.mainMenu();
    }

    async getBookByTitle(): Promise<void> {
        const title = prompt('Book Title: ');

        const book = await Book.findOne({title: title});
        if (book) {
            return menus.bookMenu(book);
        } else {
            console.log('Book with this title doesnt exists!');
            return menus.mainMenu();
        }
    }

    async addBook(): Promise<void> {
        const user = UserClass.getInstance();
        const author = user.getUser()?.username;
        const title = prompt('Book Title: ');
        const year = prompt('Year of release: ');
        const description = prompt('Description: ');
        const url = prompt('URL: ');

        const newBook = await Book.create({
            title,
            author,
            year,
            description,
            url
        });

        if (!newBook) {
            console.log('An error occurred while creating the book');
            return menus.profileMenu();
        }

        return menus.bookMenu(newBook);
    }

    async deleteBook(): Promise<void> {
        const user = UserClass.getInstance();
        const author = user.getUser()?.username;
        const title = prompt('Book Title: ');

        const book = await Book.findOne({title});
        if (!book) {
            console.log('Book with this title not found');
            return menus.profileMenu();
        } else if (book.author != author) {
            console.log('You are not author of this book');
            return menus.profileMenu();
        }

        await Book.findByIdAndDelete(book.id);
        return menus.profileMenu();
    }

    async myBooks(): Promise<void> {
        const user = UserClass.getInstance();
        const author = user.getUser()?.username;

        const books = await Book.find({author});

        if (!books) {
            console.log('You dont have any books');
            return menus.profileMenu();
        }

        books.forEach((book, i) => {
            console.log(`${i + 1}) ${book.title}. ${book.author} [${book.year}]`);
        });

        return menus.mainMenu();
    }

    validate(): IUser | null {
        const user = UserClass.getInstance();
        return user.getUser();
    }
}

export class BookServiceProxy implements BookServiceI {
    async myBooks(): Promise<void> {
        const bookService = new BookService();
        const user = bookService.validate();
        if (!user) {
            console.log('You are not authorized!');
            return menus.mainMenu();
        }
        activity.setActivity({user, activity: 'myBooks'});
        return bookService.myBooks();
    }

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

    async deleteBook(): Promise<void> {
        const bookService = new BookService();
        const user = bookService.validate();
        if (!user) {
            console.log('You are not authorized!');
            return menus.mainMenu();
        }
        activity.setActivity({user, activity: 'deleteBook'});
        return bookService.deleteBook();
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