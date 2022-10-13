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
exports.profileMenu = void 0;
const main_menu_1 = require("./main-menu");
const User_1 = __importDefault(require("../models/User"));
const user_controller_1 = require("../controllers/user-controller");
const menu = require('console-menu');
function profileMenu() {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield User_1.default.findById(user_controller_1.userID);
        menu([
            { hotkey: '1', title: `Username: ${user === null || user === void 0 ? void 0 : user.username}` },
            { hotkey: '2', title: 'Back' },
            { separator: true },
            { hotkey: '?', title: 'Help' },
        ], {
            header: 'Profile Menu',
            border: true,
        }).then((item) => {
            if (item) {
                switch (item.hotkey) {
                    case '2': {
                        return (0, main_menu_1.mainMenu)();
                    }
                    case '?': {
                        console.log('Help Command');
                        return profileMenu();
                    }
                    default: {
                        return profileMenu();
                    }
                }
            }
            else {
                console.log('You cancelled the menu.');
            }
        });
    });
}
exports.profileMenu = profileMenu;
