import User from "../models/User";
import {activity, UserClass} from "../controllers/user-controller";

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
        activity.setActivity({user: person, activity: 'signIn'});
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
            activity.setActivity({user: newUser, activity: 'signUp'});
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