"use strict";

import {Schema, model} from 'mongoose';
import {Typing} from 'rev-node-utils';

let entityName: string = 'users';

let schema: Schema = new Schema({
    name: {
        type: Schema.Types.String,
        required: true,
        index: true,
        set: (value: string) => {
            return value.trim().replace(/\s\s+/, ' ');
        },
    },
    email: {
        type: Schema.Types.Number,
        required: true,
        index: true,
        set: (value: string) => {
            return value.trim().replace(/\s\s+/, ' ');
        }
    },
    salt: {
        type: Schema.Types.String,
        required: true,
        set: (value: string) => {
            return value.trim().replace(/\s\s+/, ' ');
        }
    },
    password: {
        type: Schema.Types.String,
        required: true,
        set: (value: string) => {
            return value.trim().replace(/\s\s+/, ' ');
        }
    },

});

let thisModel = null;


module.exports = () => {
    if (Typing.isEmpty(thisModel)) {
        thisModel = model(entityName, schema);
    }

    return thisModel;
};