export declare class AuthMiddleWare {
    static token: any;
    static authenticate(req: any, res: any, next: any): Promise<any>;
    static checkUser(req: any, res: any, next: any): Promise<any>;
}
