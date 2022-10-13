import User from "../models/User";
import {setUser} from "../controllers/user-controller";

interface AuthStrategy {
    signUp(username: string, password: string): Promise<boolean>;
    signIn(username: string, password: string): Promise<boolean>;
}

export default new class AuthByUsername implements AuthStrategy {
    async signIn(username: string, password: string): Promise<boolean> {
        const person = await User.findOne({username});
        if (!person) {
            console.log('User with this username doesnt exists!');
            return false;
        } else {
            setUser(person._id);
            return true;
        }
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
            setUser(newUser._id);
            return true;
        } else {
            console.log('Error');
            return false;
        }
    }

}