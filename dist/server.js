"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config({ path: './.env' });
const env_1 = require("./environments/env");
const Routes_1 = require("./routers/Routes");
class Server {
    constructor() {
        this.app = express();
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
        mongoose.connect((0, env_1.getEnvironmentVariable)().db_url, {
        // useCreateIndex: true,
        // useNewUrlParser: true,
        // useUnifiedTopology: true
        }).then(() => {
            console.log("Database connected");
        }).catch((e) => {
            console.log('failed');
        });
    }
    setRoutes() {
        this.app.use('/api', Routes_1.default);
    }
    enableCors() {
        this.app.use(cors({
            origin: true,
            credentials: true
        }));
    }
    configBodyParser() {
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.json());
        this.app.use('/api-doc', express.static('./apidoc/'));
    }
    error404Handler() {
        this.app.use((req, res) => {
            res.status(404).json({
                message: 'Route Not found',
                status_code: 404
            });
        });
    }
    handleErrors() {
        this.app.use((error, req, res, next) => {
            const errorStatus = req.errorStatus;
            res.status(errorStatus).json({
                message: error.message || 'Something went wrong!!',
                status_code: errorStatus
            });
        });
    }
}
exports.Server = Server;
