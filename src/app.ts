"use strict";

import * as Express from 'express';
import {userController} from "./controllers/userController";
import {Bootstrap} from "./application/Bootstrap";

const express = require('express');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
//var multer = require('multer'); // v1.0.5
//var upload = multer(); // for parsing multipart/form-data


const app = express();
app.use(cookieParser());
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded


process.title = 'reminder';

new Bootstrap(app);

app.listen(3000, () => console.log('Example app listening on port 3000!'));
