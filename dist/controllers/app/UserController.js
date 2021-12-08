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
exports.UserController = void 0;
const formidable = require("formidable");
/**Load Services */
const ResponseService_1 = require("../../services/ResponseService");
/**Load Helpers */
const GlobalHelper_1 = require("../../helpers/GlobalHelper");
/**Load Models */
const User_1 = require("../../models/User");
class UserController {
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
    static updateProfile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const form = formidable({ multiples: true });
                form.parse(req, (err, fields, files) => __awaiter(this, void 0, void 0, function* () {
                    req.body = fields;
                    console.log(req.body);
                    let user = yield User_1.default.findOne({ _id: req.data._id });
                    if (user) {
                        user.full_name = req.body.full_name || null;
                        user.gender = req.body.gender || 'MALE';
                        user.address = req.body.address || null;
                        yield user.save();
                        if (files.profile_pic) {
                            let imagePath = yield GlobalHelper_1.GlobalHelper.uploadInS3(files.profile_pic);
                            console.log(imagePath);
                            if (imagePath) {
                                GlobalHelper_1.GlobalHelper.deleteFromS3(user.profile_pic);
                                user.profile_pic = imagePath;
                                yield user.save();
                            }
                        }
                        user = JSON.parse(JSON.stringify(user));
                        delete user.password;
                        return ResponseService_1.default.ok(res, 'Profile updated successfully.', { user: user });
                    }
                    else
                        return ResponseService_1.default.notFound(res, 'User not found', {});
                }));
            }
            catch (e) {
                console.log(e);
                return ResponseService_1.default.serverError(res);
            }
        });
    }
    /**
   * @api {get} /user/get-profile-detail Get Profile detail
   * @apiVersion 1.0.0
   * @apiGroup User Profile & Settings
   * @apiDescription You can pass user id as url parameter to get the details of other user.For eg-/user/get-profile-detail/{user id}
   * @apiSuccessExample {json} Success-Response:
   *{"status":200,"message":"User details","data":{"user":{"_id":"61ae02ee633cddf5f98a5560","email":"ad.khan@test.com","phone_number":"9140948309","profile_pic":"profile_pictures/image_1638808535085.png","otp_code":7001,"country_code":"91","voip_token":null,"current_login_device":null,"muted_user":[],"notification_status":true,"is_account_active":true,"last_login":"1638793886466","account_status":"VERIFIED","is_online":false,"time_stamp":"1638793886466","device_info":[],"created_at":"2021-12-06T12:32:46.129Z","updatedAt":"2021-12-06T16:35:35.233Z","__v":0,"address":"123","full_name":"Shhha","gender":"MALE"}}}
   **/
    static getProfileDetail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let userId = req.params.userId || req.data._id;
                let user = yield User_1.default.findOne({ _id: userId });
                user = JSON.parse(JSON.stringify(user));
                delete user.password;
                return ResponseService_1.default.ok(res, 'User details', { user: user });
            }
            catch (e) {
                return ResponseService_1.default.notFound(res, 'User not found', {});
            }
        });
    }
}
exports.UserController = UserController;
