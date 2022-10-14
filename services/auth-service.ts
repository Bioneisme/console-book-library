import User from "../models/User";
import {UserClass} from "../controllers/user-controller";

interface AuthStrategy {
    signUp(username: string, password: string): Promise<boolean>;

    signIn(username: string, password: string): Promise<boolean>;

    logout(): void;
}

export default new class AuthByUsername implements AuthStrategy {
    async signIn(username: string, password: string): Promise<boolean> {
        const person = await User.findOne({username});
        if (!person) {
            console.log('User with this username doesnt exists!');
            return false;
        }
        if (password != person.password) {
            console.log('Username or password is incorrect!');
            return false;
        }
        const user = UserClass.getInstance();
        user.setUser(person);
        return true;
    }

    async signUp(username: string, password: string): Promise<boolean> {
        const person = await User.findOne({username});
        if (person) {
            console.log('User with this username already exists!');
            return false;
        }

        const newUser = await User.create({
            username,
            password
        });

        if (newUser) {
            const user = UserClass.getInstance();
            user.setUser(newUser);
            return true;
        } else {
            console.log('Error');
            return false;
        }
    }

    logout(): void {
        const user = UserClass.getInstance();
        user.setUser(null);
    }

}