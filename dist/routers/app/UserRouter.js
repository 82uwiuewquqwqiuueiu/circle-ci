"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRouter = void 0;
const express_1 = require("express");
const UserController_1 = require("../../controllers/app/UserController");
const AuthMiddleware_1 = require("../../middleware/AuthMiddleware");
class UserRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.getRoutes();
        this.postRoutes();
        this.patchRoutes();
        this.deleteRoutes();
        this.putRoutes();
    }
    getRoutes() {
        this.router.get('/get-profile-detail/:userId?', AuthMiddleware_1.AuthMiddleWare.authenticate, UserController_1.UserController.getProfileDetail);
    }
    postRoutes() {
    }
    patchRoutes() {
    }
    putRoutes() {
        this.router.put('/update-profile', AuthMiddleware_1.AuthMiddleWare.authenticate, UserController_1.UserController.updateProfile);
    }
    deleteRoutes() {
    }
}
exports.UserRouter = UserRouter;
exports.default = new UserRouter().router;
