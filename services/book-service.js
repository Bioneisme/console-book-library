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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Authorized = exports.Unauthorized = void 0;
const main_menu_1 = require("../menu/main-menu");
const Book_1 = __importDefault(require("../models/Book"));
const book_menu_1 = require("../menu/book-menu");
const user_controller_1 = require("../controllers/user-controller");
const profile_menu_1 = require("../menu/profile-menu");
const prompt = require('prompt-sync')();
class Unauthorized {
    getAllBooks() {
        console.log('You are not authorized!');
        (0, main_menu_1.mainMenu)();
    }
    getBookByTitle() {
        console.log('You are not authorized!');
        (0, main_menu_1.mainMenu)();
    }
    addBook() {
        console.log('You are not authorized!');
        (0, main_menu_1.mainMenu)();
    }
}
exports.Unauthorized = Unauthorized;
class Authorized {
    getAllBooks() {
        return __awaiter(this, void 0, void 0, function* () {
            const books = yield Book_1.default.find();
            books.forEach((book, i) => {
                console.log(`${i + 1}) ${book.title}. ${book.author} [${book.year}]`);
            });
            (0, main_menu_1.mainMenu)();
        });
    }
    getBookByTitle() {
        return __awaiter(this, void 0, void 0, function* () {
            const title = prompt('Book Title: ');
            const book = yield Book_1.default.findOne({ title: title });
            if (book) {
                yield (0, book_menu_1.bookMenu)(book);
            }
            else {
                console.log('Book with this title doesnt exists!');
                (0, main_menu_1.mainMenu)();
            }
        });
    }
    addBook() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const user = user_controller_1.UserClass.getInstance();
            const author = (_a = user.getUser()) === null || _a === void 0 ? void 0 : _a.username;
            const title = prompt('Book Title: ');
            const year = prompt('Year of release: ');
            const description = prompt('Description: ');
            const newBook = yield Book_1.default.create({
                title,
                author,
                year,
                description
            });
            if (!newBook) {
                console.log('An error occurred while creating the book');
                return (0, profile_menu_1.profileMenu)();
            }
            return (0, book_menu_1.bookMenu)(newBook);
        });
    }
}
exports.Authorized = Authorized;
