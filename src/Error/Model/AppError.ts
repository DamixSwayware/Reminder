"use strict";

import {Error} from "../Error";

export class AppError extends Error {
    public static internalServerError() {
        return this.serialize('Internal server error', 500);
    }

    public static undefinedRequireData() {
        return this.serialize('Require data is undefined!', 902);
    }

    public static undefinedError() {
        return this.serialize('Ups... Something wents wrong!', 903);
    }
}