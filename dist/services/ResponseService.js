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
class ResponseLibrary {
    ok(res, message, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return res.status(200).json({ status: 200, message: message, data: data });
        });
    }
    apiBadRequest(res, message, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return res.status(400).json({ status: 400, message: message, data: data });
        });
    }
    invalidParameters(res, message, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return res.status(406).json({ status: 406, message: message, data: data });
        });
    }
    existConflict(res, message, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return res.status(409).json({ status: 409, message: message, data: data });
        });
    }
    serverError(res, catchError = false, message = 'Internal server error.', data = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            if (catchError) {
                console.log('************************************************CATCH ERROR START************************************************');
                console.log(catchError);
                console.log('************************************************CATCH ERROR ENDS************************************************');
            }
            return res.status(500).json({ status: 500, message: message, data: data });
        });
    }
    recordCreated(res, message, data = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return res.status(201).json({ status: 201, message: message, data: data });
        });
    }
    unauthorized(res, message, data = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return res.status(401).json({ status: 401, message: message, data: data });
        });
    }
    notFound(res, message, data = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return res.status(404).json({ status: 404, message: message, data: data });
        });
    }
    forBidden(res, message, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return res.status(403).json({ status: 403, message: message, data: data });
        });
    }
}
let respObj = new ResponseLibrary();
exports.default = respObj;
