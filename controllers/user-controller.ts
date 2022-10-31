import AuthService from "../services/auth-service";
import {authMenu} from "../views/auth-menu";
import {profileMenu} from "../views/profile-menu";
import {IUser} from "../models/User";
import logger from "../utils/logging";
const prompt = require('prompt-sync')();

interface activityState {
    user: IUser;
    activity: string;
}

class activityContext {
    private activity: activityState | null;

    constructor() {
        this.activity = null;
    };

    public setActivity(activity: activityState): void {
        this.activity = activity;
        logger.info(`(${activity.user.id}) ${activity.user.username}: ${activity.activity}`);
    };
}

export const activity = new activityContext();

export class UserClass {
    private static instance: UserClass;
    private user: IUser | null = null;

    public static getInstance(): UserClass {
        if (!UserClass.instance) {
            UserClass.instance = new UserClass();
        }

        return UserClass.instance;
    }

    public setUser(user: IUser | null): void {
        this.user = user;
    }

    public getUser(): IUser | null {
        return this.user;
    }
}

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