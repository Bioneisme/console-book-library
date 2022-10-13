import {mainMenu} from "./main-menu";
import User from "../models/User";
import {userID} from "../controllers/user-controller";

const menu = require('console-menu');

export async function profileMenu(): Promise<void> {
    const user = await User.findById(userID);

    menu([
        {hotkey: '1', title: `Username: ${user?.username}`},
        {hotkey: '2', title: 'Back'},
        {separator: true},
        {hotkey: '?', title: 'Help'},
    ], {
        header: 'Profile Menu',
        border: true,
    }).then((item: any) => {
        if (item) {
            switch (item.hotkey) {
                case '2': {
                    return mainMenu();
                }
                case '?': {
                    console.log('Help Command');
                    return profileMenu();
                }
                default: {
                    return profileMenu();
                }
            }
        } else {
            console.log('You cancelled the menu.');
        }
    })
}