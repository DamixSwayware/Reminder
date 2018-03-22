"use strict";

import * as Express from "express";
import {IUser} from "../Entity/IUser";
import * as Mongoose from "mongoose";

let bcrypt = require('bcryptjs');

export class userService {
    private userModel: Mongoose.Model<IUser> = null;
    private req: Express.Request = null;
    private res: Express.Response = null;

    public constructor(request: Express.Request, response: Express.Response) {
        this.req = request;
        this.res = response;
        this.userModel = require('./../Entity/User')();
    }

    public async register() {
        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(this.req.body.password, salt);

        let user: IUser = new this.userModel();
        user.name = this.req.body.username;
        user.email = this.req.body.email;
        user.salt = salt;
        user.password = hash;
        await user.save();
    }

    public async getInfo() {
        /* let user: IUser = new this.userModel();
         user.name = "Damian";
         user.email = "damix.swayware@gmail.com";
         user.phone = 725889342;
         await user.save();
         */
        let user = await this.userModel.findOne({name: "Damian"});

        user.email = "f";
        user.save();

        this.res.cookie('sid', 123456, {expires: new Date(Date.now() + 1000 * 60 * 60)}); // 1 godzina

        return {
            "cookies": this.req.cookies,
            "_id": user._id,
            "name": user.name,
            "email": user.email,
        };
    }
}

