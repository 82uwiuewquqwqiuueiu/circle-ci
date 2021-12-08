"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnvironmentVariable = void 0;
const prod_env_1 = require("./prod.env");
const dev_env_1 = require("./dev.env");
function getEnvironmentVariable() {
    if (process.env.NODE_ENV === 'prod') {
        return prod_env_1.ProductionEnvironment;
    }
    return dev_env_1.DevEnvironment;
}
exports.getEnvironmentVariable = getEnvironmentVariable;
