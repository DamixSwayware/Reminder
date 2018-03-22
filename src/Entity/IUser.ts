"use strict";

import * as Mongoose from "mongoose";

export interface IUser extends Mongoose.Document {
    name: string,
    email: string,
    salt: string,
    password: string,
}