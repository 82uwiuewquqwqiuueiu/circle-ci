export declare class AuthController {
    /**
    * @api {post} /auth/signup Sign Up
    * @apiVersion 1.0.0
    * @apiGroup Auth
    * @apiParamExample {json} Request
    * {
    *    "country_code":"91",
    *    "phone_number":"7579807278",
    *    "full_name":"Shahrukh Khan",
    *    "email":"shahrukh.khan@mobilecoderz",
    *    "password":"123456"
    * }
    * @apiSuccessExample {json} Success-Response:
    * {"status":201,"message":"Otp generated","data":{"user":{"_id":"61adb4b179ef8e58aaafdfdb","email":"shahrukh.khan@mobilecoderz","full_name":"Shahrukh Khan","gender":null,"phone_number":"7579807278","profile_pic":null,"otp_code":5913,"country_code":"91","voip_token":null,"current_login_device":null,"muted_user":[],"address":null,"notification_status":true,"is_account_active":false,"last_login":"1638773930181","account_status":"PENDING","is_online":false,"time_stamp":"1638773930181","device_info":[],"created_at":"2021-12-06T06:58:57.088Z","updatedAt":"2021-12-06T07:26:12.947Z","__v":0}}}
    **/
    static signUp(req: any, res: any): Promise<any>;
    /**
    * @api {post} /auth/verify-otp Verify Otp
    * @apiVersion 1.0.0
    * @apiGroup Auth
    * @apiParamExample {json} Request
    * {"_id": "61adb4b179ef8e58aaafdfdb","otp_code": 6719,"type":"LOGIN"}
    * @apiSuccessExample {json} Success-Response:
    * {"status":200,"message":"Login successfully.","data":{"user":{"_id":"61af6ab36a0b10a3d86806fc","email":"ad.khan@test.com","full_name":"Shahrukh Khan","gender":"MALE","phone_number":"914094838","profile_pic":null,"otp_code":7646,"country_code":"91","voip_token":null,"current_login_device":null,"muted_user":[],"address":null,"notification_status":true,"is_account_active":false,"last_login":"1638875326395","account_status":"PENDING","is_online":false,"time_stamp":"1638875326395","device_info":[],"created_at":"2021-12-07T14:07:47.145Z","updatedAt":"2021-12-07T14:07:56.136Z","__v":0},"jwt_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWFmNmFiMzZhMGIxMGEzZDg2ODA2ZmMiLCJpYXQiOjE2Mzg4ODYzNTAsImV4cCI6NjA2NDM4ODg2MzUwfQ.UKwIxFfaKvQ0hIQaeDafdVJdLQlaSiZsIJqG0ynoK3s"}}
    * @apiSuccessExample {json} Invalid Otp Response
    * {"status":400,"message":"Invalid otp","data":{}}
    **/
    static verifyOtp(req: any, res: any): Promise<any>;
    /**
    * @api {post} /auth//phone-login Login via Phone Number
    * @apiVersion 1.0.0
    * @apiGroup Auth
    * @apiParamExample {json} Request
    * {"phone_number":"7579807278","country_code":"91"}
    * @apiSuccessExample {json} Success-Response:
    * {"status":200,"message":"Otp sent.","data":{"_id":"61adb4b179ef8e58aaafdfdb","otp_code":5948}}
    * @apiSuccessExample {json} Unregistered Response
    * {"status":404,"message":"User not found","data":{}}
    **/
    static phoneLogin(req: any, res: any): Promise<any>;
    /**
    * @api {post} /auth/email-login Login via Email
    * @apiVersion 1.0.0
    * @apiGroup Auth
    * @apiParamExample {json} Request
    * {"email":"shahrukh.khan@mobilecoderz.com","password":"123456"}
    * @apiSuccessExample {json} Success-Response:
    * {"status":200,"message":"Login Successfully.","data":{"user":{"_id":"61adb4b179ef8e58aaafdfdb","email":"shahrukh.khan@mobilecoderz.com","full_name":"Shahrukh Khan","gender":"MALE","phone_number":"7579807278","profile_pic":null,"otp_code":6719,"country_code":"91","voip_token":null,"current_login_device":null,"muted_user":[],"address":null,"notification_status":true,"is_account_active":true,"last_login":"1638875351641","account_status":"VERIFIED","is_online":false,"time_stamp":"1638773930181","device_info":[],"created_at":"2021-12-06T06:58:57.088Z","updatedAt":"2021-12-07T11:05:29.642Z","__v":0},"jwt_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxYWRiNGIxNzllZjhlNThhYWFmZGZkYiIsImVtYWlsIjoic2hhaHJ1a2gua2hhbkBtb2JpbGVjb2RlcnouY29tIiwiaWF0IjoxNjM4ODc1MzUxLCJleHAiOjYwNjQzODg3NTM1MX0.8SnkUaojL8wTfgEj5dl6P3qtgreMxgP1xZKM3-pwpfU"}}
    * @apiSuccessExample {json} Invalid login
    * {"status":401,"message":"Invalid credentials.","data":{}}
    **/
    static emailLogin(req: any, res: any): Promise<any>;
    /**
    * @api {post} /auth/reset-password Reset Password
    * @apiVersion 1.0.0
    * @apiGroup Auth
    * @apiParamExample {json} Request
    * {"email":"shahrukh.khan@mobilecoderz.com"}
    * @apiSuccessExample {json} Success-Response:
    * {"status":200,"message":"Otp sent.","data":{"_id":"61adb4b179ef8e58aaafdfdb","otp_code":3698}}
    * @apiSuccessExample {json} Invalid login
    * {"status":404,"message":"Account not found.","data":{}}
    **/
    static resetPassword(req: any, res: any): Promise<any>;
    /**
    * @api {post} /auth/resend-otp Resend Otp
    * @apiVersion 1.0.0
    * @apiGroup Auth
    * @apiParamExample {json} Request
    * {"_id":"61adb4b179ef8e58aaafdfdb"}
    * @apiSuccessExample {json} Success-Response:
    * {"status":200,"message":"Otp sent.","data":{"_id":"61adb4b179ef8e58aaafdfdb","otp_code":6084}}
    * @apiSuccessExample {json} Invalid Account
    * {"status":404,"message":"Account not found.","data":{}}
    **/
    static resendOtp(req: any, res: any): Promise<any>;
}
