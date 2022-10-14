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
const User_1 = __importDefault(require("../models/User"));
const user_controller_1 = require("../controllers/user-controller");
exports.default = new class AuthByUsername {
    signIn(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const person = yield User_1.default.findOne({ username });
            if (!person) {
                console.log('User with this username doesnt exists!');
                return false;
            }
            if (password != person.password) {
                console.log('Username or password is incorrect!');
                return false;
            }
            const user = user_controller_1.UserClass.getInstance();
            user.setUser(person);
            return true;
        });
    }
    signUp(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const person = yield User_1.default.findOne({ username });
            if (person) {
                console.log('User with this username already exists!');
                return false;
            }
            const newUser = yield User_1.default.create({
                username,
                password
            });
            if (newUser) {
                const user = user_controller_1.UserClass.getInstance();
                user.setUser(newUser);
                return true;
            }
            else {
                console.log('Error');
                return false;
            }
        });
    }
    logout() {
        const user = user_controller_1.UserClass.getInstance();
        user.setUser(null);
    }
};
