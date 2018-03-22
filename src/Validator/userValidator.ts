"use strict";

import * as Mongoose from "mongoose";
import {IUser} from "../Entity/IUser";
import {Typing} from 'rev-node-utils';

export class userValidator {
    public static isUsernameValid(username: string): boolean {
        if (username.length < 5) {
            return false;
        }

        return /^[a-zA-Z0-9\s\\_\\-]+$/.test(username);
    }

    public static async isUsernameInUse(username: string) {
        let userModel: Mongoose.Model<IUser> = require('./../Entity/User')();

        let user = await userModel.findOne({name: username}).exec();

        return !Typing.isEmpty(user);
    }

    public static isEmailValid(email: string): boolean {
        if (email.length < 5) {
            return false;
        }

        let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    public static async isEmailInUse(email: string) {
        let userModel: Mongoose.Model<IUser> = require('./../Entity/User')();

        let user = await userModel.findOne({email: email}).exec();

        return !Typing.isEmpty(user);
    }

    public static isPasswordValid(password: string): boolean {
        if (password.length < 5) {
            return false;
        }

        // lower case
        let r1: RegExp = new RegExp('[a-z]');
        // upper case
        let r2: RegExp = new RegExp('[A-Z]');
        // digits
        let r3: RegExp = new RegExp('[0-9]');
        // special chars
        let r4: RegExp = new RegExp('[\\!\\@\\#\\$\\%\\^\\&\\*\\(\\)\\_\\+\\-\\=\\{\\}\\[\\]\\;\\\'\\:\\"\\,\\.\\<\\>\\?\\/\\`\\~\\\\|]');

        return (r1.test(password) && r2.test(password) && r3.test(password) && r4.test(password));
    }
}

