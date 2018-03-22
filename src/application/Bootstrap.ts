"use strict";

import * as Express from "express";
import {userController} from "../controllers/userController";
import {PathParams} from "express-serve-static-core";
import {Database} from "../Config/Database";
import {AppError} from "../Error/Model/AppError";

const express = require('express');
const fs = require("fs");

interface RouteMapInterface {
    path: PathParams;
    method: string;
    controller: any;
    action: any;
    middlewares: Array<string>;
}

export class Bootstrap {
    public constructor(app: Express.Application) {
        Bootstrap.connectToDatabase().then(() => {
            let routeMap: Array<RouteMapInterface> = JSON.parse(fs.readFileSync("./src/Config/RoutesMap.json"));
            for (let route of routeMap) {
                // Creating requests
                app[route.method](route.path, (req: Express.Request, res: Express.Response) => {
                    Bootstrap.run(route.controller, route.action, req, res);
                });
            }

            // Otherwise, when route not found
            app.all(/.*/, (req: Express.Request, res: Express.Response) => {
                res.statusCode = 404;
                res.send({
                    "error": {
                        "code": 404,
                        "message": "Route not found!"
                    }
                });
            })
        });
    }

    private static async connectToDatabase() {
        try {
            await Database.initialize();
        } catch {
            console.error('Cannot connect to database. Exiting...');
            process.exit(0);
        }
    }

    private static async run(controller: any, action: any, req: Express.Request, res: Express.Response): Promise<any> {
        try {
            // Get controller function
            let Controller = (require('./../controllers/' + [controller]))[controller];

            // Create controller object
            let Ctrl: any = new Controller(req, res);

            // Send Response from controller action
            res.send(await Ctrl[action + 'Action']());
        } catch (err) {
            /// When controller throw exception
            console.error(err);
            res.send(AppError.internalServerError());
        }
    }
}


