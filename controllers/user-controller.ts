import AuthService from "../services/auth-service";
import {authMenu} from "../menu/auth-menu";
import {profileMenu} from "../menu/profile-menu";
const prompt = require('prompt-sync')();

export let userID: string;

export const setUser = (id: string) => userID = id;

export default new class UserController {
    async signUp() {
        const username = prompt('Username: ');
        const password = prompt('Password: ');
        const res = await AuthService.signUp(username, password);
        if (res) {
            await profileMenu();
        } else {
            authMenu();
        }
    }

    async signIn() {
        const username = prompt('Username: ');
        const password = prompt('Password: ');
        const res = await AuthService.signIn(username, password);
        if (res) {
            await profileMenu();
        } else {
            authMenu();
        }
    }
}