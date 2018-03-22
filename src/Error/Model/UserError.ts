"use strict";

import {Error} from "../Error";

export class UserError extends Error
{
    public static invalidEmail() {
        return this.serialize('E-mail is invalid!', 1001);
    }

    public static invalidName() {
        return this.serialize('Username is invalid!', 1002);
    }

    public static invalidPhone() {
        return this.serialize('Phone number is invalid!', 1003);
    }

    public static passwordOrEmailInvalid() {
        return this.serialize('Invalid password or e-mail!', 1004);
    }

    public static invalidPassword() {
        return this.serialize('Password is invalid!', 1005);
    }

    public static usernameInUse() {
        return this.serialize('You cannot use this username!', 1006);
    }

    public static emailInUse() {
        return this.serialize('You cannot use this email!', 1007);
    }

}