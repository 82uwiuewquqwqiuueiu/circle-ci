declare class ResponseLibrary {
    ok(res: any, message: any, data: any): Promise<any>;
    apiBadRequest(res: any, message: any, data: any): Promise<any>;
    invalidParameters(res: any, message: any, data: any): Promise<any>;
    existConflict(res: any, message: any, data: any): Promise<any>;
    serverError(res: any, catchError?: boolean, message?: string, data?: {}): Promise<any>;
    recordCreated(res: any, message: any, data?: {}): Promise<any>;
    unauthorized(res: any, message: any, data?: {}): Promise<any>;
    notFound(res: any, message: any, data?: {}): Promise<any>;
    forBidden(res: any, message: any, data: any): Promise<any>;
}
declare let respObj: ResponseLibrary;
export default respObj;
