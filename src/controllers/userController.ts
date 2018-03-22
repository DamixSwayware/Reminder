"use strict";

import * as Express from "express";
import * as Mongoose from "mongoose";
import {userService} from "../Service/UserService";
import {userValidator} from "../Validator/userValidator";
import {UserError} from "../Error/Model/UserError";
import {isNullOrUndefined, isUndefined} from "util";
import {AppError} from "../Error/Model/AppError";

export class userController {
    private req: Express.Request = null;
    private res: Express.Response = null;
    private userService: userService;

    public constructor(request: Express.Request, response: Express.Response) {
        this.req = request;
        this.res = response;
        this.userService = new userService(request, response);
    }

    public async registerAction() {
        if (isUndefined(this.req.body)
            || isUndefined(this.req.body.username)
            || isUndefined(this.req.body.email)
            || isUndefined(this.req.body.password)
        ) {
            return AppError.undefinedRequireData();
        }

        if (await userValidator.isUsernameInUse(this.req.body.username)) {
            return UserError.usernameInUse();
        }

        if (!userValidator.isUsernameValid(this.req.body.username)) {
            return UserError.invalidName();
        }

        if (await userValidator.isEmailInUse(this.req.body.email)) {
            return UserError.emailInUse();
        }

        if (!userValidator.isEmailValid(this.req.body.email)) {
            return UserError.invalidEmail();
        }

        if (!userValidator.isPasswordValid(this.req.body.password)) {
            return UserError.invalidPassword();
        }

        try {
            let serviceResponse = await this.userService.register();
        } catch (err) {
            throw err;
        }

        return {
            "data": {
                "registered": true
            }
        };
    }

    public async getInfoAction() {
        /* let user: IUser = new this.userModel();
         user.name = "Damian";
         user.email = "damix.swayware@gmail.com";
         user.phone = 725889342;
         await user.save();
         */


        /*let user = await this.userModel.findOne({name: "Damian"});

         user.email = "f";
         user.save();
         */

        //this.res.cookie('sid', 123456, { expires: new Date(Date.now() + 1000 * 60 * 60) }); // 1 godzina

        return {
            "cookies": this.req.cookies,
        };
    }
}

