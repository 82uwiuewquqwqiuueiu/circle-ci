import * as Bcrypt from 'bcrypt';
import * as formidable from "formidable";
/**Load Services */
import _RS from '../../services/ResponseService';
/**Load Helpers */
import { GlobalHelper } from '../../helpers/GlobalHelper';
/**Load Models */
import User from '../../models/User';

export class UserController {
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
    static async updateProfile(req,res){
        try{
            const form = formidable({ multiples: true });
            form.parse(req, async (err, fields, files) => {
                req.body = fields;
                console.log(req.body)
                let user=await User.findOne({_id:req.data._id});
                if(user){
                    user.full_name=req.body.full_name || null;
                    user.gender=req.body.gender || 'MALE';
                    user.address=req.body.address || null;
                    await user.save();
                    
                    if (files.profile_pic) {
                        let imagePath = await GlobalHelper.uploadInS3(files.profile_pic);
                        console.log(imagePath);
                        if (imagePath) {
                            GlobalHelper.deleteFromS3(user.profile_pic);
                            user.profile_pic = imagePath;
                            await user.save();
                        }
    
                    }
                    user=JSON.parse(JSON.stringify(user));
                    delete user.password;
                    return _RS.ok(res,'Profile updated successfully.',{user:user});
                }
                else
                return _RS.notFound(res,'User not found',{});  
            });
                            
        }
        catch (e) {
            console.log(e);
            return _RS.serverError(res);
        }
    }
     /**
    * @api {get} /user/get-profile-detail Get Profile detail
    * @apiVersion 1.0.0 
    * @apiGroup User Profile & Settings
    * @apiDescription You can pass user id as url parameter to get the details of other user.For eg-/user/get-profile-detail/{user id}    
    * @apiSuccessExample {json} Success-Response:
    *{"status":200,"message":"User details","data":{"user":{"_id":"61ae02ee633cddf5f98a5560","email":"ad.khan@test.com","phone_number":"9140948309","profile_pic":"profile_pictures/image_1638808535085.png","otp_code":7001,"country_code":"91","voip_token":null,"current_login_device":null,"muted_user":[],"notification_status":true,"is_account_active":true,"last_login":"1638793886466","account_status":"VERIFIED","is_online":false,"time_stamp":"1638793886466","device_info":[],"created_at":"2021-12-06T12:32:46.129Z","updatedAt":"2021-12-06T16:35:35.233Z","__v":0,"address":"123","full_name":"Shhha","gender":"MALE"}}}
    **/
    static async getProfileDetail(req,res){
        try{
            let userId= req.params.userId || req.data._id;
            let user= await User.findOne({_id:userId})
            user=JSON.parse(JSON.stringify(user));
            delete user.password;
            return _RS.ok(res,'User details',{user:user});
        }
        catch(e){
            return _RS.notFound(res,'User not found',{});  
        }
    }

}