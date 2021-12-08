"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Routes = void 0;
const express_1 = require("express");
const AuthRouter_1 = require("../routers/app/AuthRouter");
const UserRouter_1 = require("./app/UserRouter");
class Routes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.app();
        this.admin();
    }
    app() {
        this.router.use('/app/auth', AuthRouter_1.default);
        this.router.use('/app/user', UserRouter_1.default);
    }
    admin() {
    }
}
exports.Routes = Routes;
exports.default = new Routes().router;
