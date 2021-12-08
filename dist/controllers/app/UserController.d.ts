export declare class UserController {
    /**
    * @api {put} /user/update-profile Update Profile
    * @apiVersion 1.0.0
    * @apiGroup User Profile & Settings
    * @apiDescription Form Data/Multipart API.
    * @apiParam {string} full_name Name Of User
    * @apiParam {string} gender  Predefined values- MALE,FEMALE,OTHER
    * @apiParam {string} address Address of user
    * @apiParam {file}   [profile_pic] File type
    * @apiSuccessExample {json} Success-Response:
    *{"status":200,"message":"Profile updated successfully.","data":{"user":{"_id":"61ae02ee633cddf5f98a5560","email":"ad.khan@test.com","phone_number":"9140948309","profile_pic":"profile_pictures/image_1638853331584.png","otp_code":7001,"country_code":"91","voip_token":null,"current_login_device":null,"muted_user":[],"notification_status":true,"is_account_active":true,"last_login":"1638793886466","account_status":"VERIFIED","is_online":false,"time_stamp":"1638793886466","device_info":[],"created_at":"2021-12-06T12:32:46.129Z","updatedAt":"2021-12-07T05:02:11.773Z","__v":0,"address":"123","full_name":"Shhha","gender":"MALE"}}}
    **/
    static updateProfile(req: any, res: any): Promise<any>;
    /**
   * @api {get} /user/get-profile-detail Get Profile detail
   * @apiVersion 1.0.0
   * @apiGroup User Profile & Settings
   * @apiDescription You can pass user id as url parameter to get the details of other user.For eg-/user/get-profile-detail/{user id}
   * @apiSuccessExample {json} Success-Response:
   *{"status":200,"message":"User details","data":{"user":{"_id":"61ae02ee633cddf5f98a5560","email":"ad.khan@test.com","phone_number":"9140948309","profile_pic":"profile_pictures/image_1638808535085.png","otp_code":7001,"country_code":"91","voip_token":null,"current_login_device":null,"muted_user":[],"notification_status":true,"is_account_active":true,"last_login":"1638793886466","account_status":"VERIFIED","is_online":false,"time_stamp":"1638793886466","device_info":[],"created_at":"2021-12-06T12:32:46.129Z","updatedAt":"2021-12-06T16:35:35.233Z","__v":0,"address":"123","full_name":"Shhha","gender":"MALE"}}}
   **/
    static getProfileDetail(req: any, res: any): Promise<any>;
}
