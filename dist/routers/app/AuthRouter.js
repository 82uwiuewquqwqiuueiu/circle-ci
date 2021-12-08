"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRouter = void 0;
const express_1 = require("express");
const AuthController_1 = require("../../controllers/app/AuthController");
const AuthMiddleware_1 = require("../../middleware/AuthMiddleware");
class AuthRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.getRoutes();
        this.postRoutes();
        this.patchRoutes();
        this.deleteRoutes();
        this.putRoutes();
    }
    getRoutes() {
    }
    postRoutes() {
        this.router.post('/signup', AuthMiddleware_1.AuthMiddleWare.checkUser, AuthController_1.AuthController.signUp);
        this.router.post('/verify-otp', AuthMiddleware_1.AuthMiddleWare.checkUser, AuthController_1.AuthController.verifyOtp);
        this.router.post('/phone-login', AuthController_1.AuthController.phoneLogin);
        this.router.post('/email-login', AuthController_1.AuthController.emailLogin);
        this.router.post('/reset-password', AuthController_1.AuthController.resetPassword);
        this.router.post('/resend-otp', AuthController_1.AuthController.resendOtp);
    }
    patchRoutes() {
    }
    putRoutes() {
    }
    deleteRoutes() {
    }
}
exports.AuthRouter = AuthRouter;
exports.default = new AuthRouter().router;
