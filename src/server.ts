import * as express from 'express';
import * as mongoose from 'mongoose';
import * as cors from 'cors';
import { Router } from "express";
import * as dotenv from 'dotenv';
dotenv.config({ path: './.env' });
import { getEnvironmentVariable } from './environments/env';
import Routes from './routers/Routes';

export class Server {
    public app: express.Application = express();

    constructor() {
        this.setConfigurations();
        this.setRoutes();
        this.error404Handler();
        this.handleErrors();
    }

    setConfigurations() {
        this.enableCors();
        this.setMongodb();
        this.configBodyParser();
    }

    setMongodb() {
        mongoose.connect(getEnvironmentVariable().db_url, {
            // useCreateIndex: true,
            // useNewUrlParser: true,
            // useUnifiedTopology: true
        }).then(() => {
            console.log("Database connected");
        }).catch((e) => {
            console.log('failed');
        })
    }

    setRoutes() {
        this.app.use('/api', Routes)
    }

    enableCors() {
        this.app.use(
            cors({
                origin: true,
                credentials: true
            })
        );
    }

    configBodyParser() {
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.json());
        this.app.use('/api-doc',express.static('./apidoc/'))
    }


    error404Handler() {
        this.app.use((req, res) => {
            res.status(404).json({
                message: 'Route Not found',
                status_code: 404
            });
        })
    }

    handleErrors() {
        this.app.use((error, req, res, next) => {
            const errorStatus = req.errorStatus;
            res.status(errorStatus).json({
                message: error.message || 'Something went wrong!!',
                status_code: errorStatus
            })
        })
    }
}