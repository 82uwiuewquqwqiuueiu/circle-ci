"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DevEnvironment = void 0;
exports.DevEnvironment = {
    db_url: process.env.DB_URL,
    access_key: process.env.ACCESS_KEY,
    secret_key: process.env.SECRET_KEY,
    bucket_name: process.env.BUCKET_NAME,
    jwt_key: process.env.JWT_KEY
};
