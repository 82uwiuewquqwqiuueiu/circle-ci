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
exports.GlobalHelper = void 0;
const Jwt = require("jsonwebtoken");
const fs = require('fs');
const AWS = require("aws-sdk");
const env_1 = require("../environments/env");
class GlobalHelper {
    //generate four digits unique otp
    static generateOtp(size = 4) {
        let otp = '';
        let val;
        val = Math.floor(100000 + Math.random() * 900000);
        val = String(val);
        otp = val.substring(0, 4);
        return parseInt(otp);
    }
    //genrate Jwt token
    static generateJwtToken(userObject) {
        {
            return Jwt.sign(userObject, process.env.JWT_KEY, {
                expiresIn: 86400000000 * 7,
            });
        }
        ;
    }
    //upload images or files in S3 bucket
    static uploadInS3(image, path = 'profile_pictures') {
        //let path:any= 'profile_pictures';
        console.log('upload s3 image called......');
        const imageRemoteName = `${path}/image_${new Date().getTime()}.png`;
        console.log('inside s3');
        return GlobalHelper.s3.putObject({
            Bucket: (0, env_1.getEnvironmentVariable)().bucket_name,
            Body: fs.readFileSync(image.filepath),
            ContentType: image.mimetype,
            Key: imageRemoteName,
            ACL: 'public-read'
        })
            .promise()
            .then((response) => __awaiter(this, void 0, void 0, function* () {
            console.log('image remote name', imageRemoteName);
            return imageRemoteName;
        }))
            .catch(err => {
            console.log('failed:', err);
            return false;
        });
    }
    //delete files from S3 bucket
    static deleteFromS3(path) {
        return GlobalHelper.s3.deleteObject({
            Bucket: (0, env_1.getEnvironmentVariable)().bucket_name,
            Key: path
        }, function (err, data) {
            console.log(data);
        });
    }
}
exports.GlobalHelper = GlobalHelper;
GlobalHelper.s3 = new AWS.S3({
    accessKeyId: (0, env_1.getEnvironmentVariable)().access_key,
    secretAccessKey: (0, env_1.getEnvironmentVariable)().secret_key //will be put in .env
});
