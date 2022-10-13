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
exports.setUser = exports.userID = void 0;
const auth_service_1 = __importDefault(require("../services/auth-service"));
const auth_menu_1 = require("../menu/auth-menu");
const profile_menu_1 = require("../menu/profile-menu");
const prompt = require('prompt-sync')();
const setUser = (id) => exports.userID = id;
exports.setUser = setUser;
exports.default = new class UserController {
    signUp() {
        return __awaiter(this, void 0, void 0, function* () {
            const username = prompt('Username: ');
            const password = prompt('Password: ');
            const res = yield auth_service_1.default.signUp(username, password);
            if (res) {
                yield (0, profile_menu_1.profileMenu)();
            }
            else {
                (0, auth_menu_1.authMenu)();
            }
        });
    }
    signIn() {
        return __awaiter(this, void 0, void 0, function* () {
            const username = prompt('Username: ');
            const password = prompt('Password: ');
            const res = yield auth_service_1.default.signIn(username, password);
            if (res) {
                yield (0, profile_menu_1.profileMenu)();
            }
            else {
                (0, auth_menu_1.authMenu)();
            }
        });
    }
};
