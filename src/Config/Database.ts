"use strict";
const MongooseClient = require('mongoose');

MongooseClient.Promise = global.Promise;

export class Database
{
    public static async initialize() : Promise<Database>
    {
        await this.connect();

        return this;
    }

    private static connect() : Promise<boolean>
    {
        return new Promise((resolve, reject) => {

            MongooseClient.connect('mongodb://localhost/testCollection');

            let db = MongooseClient.connection;

            db.on('error', (err : any) => {
                console.error('Connection failed to \'mongo_base\'');
                reject(err);
            });
            db.once('open', function() {
                console.info("Connection with 'mongo_base' established");
                resolve();
            });

        });
    }
}
