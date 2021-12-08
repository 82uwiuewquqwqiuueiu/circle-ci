import * as express from 'express';
export declare class Server {
    app: express.Application;
    constructor();
    setConfigurations(): void;
    setMongodb(): void;
    setRoutes(): void;
    enableCors(): void;
    configBodyParser(): void;
    error404Handler(): void;
    handleErrors(): void;
}
