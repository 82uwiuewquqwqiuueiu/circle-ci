"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleWare = void 0;
const ResponseService_1 = require("../services/ResponseService");
const Jwt = require("jsonwebtoken");
const User_1 = require("../models/User");
const ResponseService_2 = require("../services/ResponseService");
class AuthMiddleWare {
    static authenticate(req, res, next) {
        AuthMiddleWare.token = req.headers.authorization;
        if (!AuthMiddleWare.token)
            return ResponseService_1.default.unauthorized(res, 'Invalid token. Please try login again.', {});
        AuthMiddleWare.token = AuthMiddleWare.token.replace(/^Bearer\s+/, "");
        Jwt.verify(AuthMiddleWare.token, process.env.JWT_KEY, (err, decoded) => {
            if (err) {
                console.log(err);
                return ResponseService_1.default.unauthorized(res, 'Failed to authenticate user.', {});
            }
            req.data = decoded;
            console.log('decoded is', req.data);
            next();
        });
    }
    ;
    static checkUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = yield User_1.default.findOne({
                $or: [
                    { email: req.body.email, account_status: { $ne: 'PENDING' } },
                    { country_code: req.body.country_code, phone_number: req.body.phone_number, account_status: { $ne: 'PENDING' } }
                ]
            });
            console.log(user);
            if (user && user.email == req.body.email.toLowerCase) {
                return ResponseService_2.default.existConflict(res, 'Email already exists', {});
            }
            else if (user && user.phone_number == req.body.phone_number) {
                return ResponseService_2.default.existConflict(res, 'Phone number already exists.', {});
            }
            else
                next();
        });
    }
}
exports.AuthMiddleWare = AuthMiddleWare;
