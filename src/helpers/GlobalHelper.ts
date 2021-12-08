import * as Jwt from 'jsonwebtoken';
const fs = require('fs');
import * as AWS from 'aws-sdk';
import User from '../models/User';
import { getEnvironmentVariable } from '../environments/env';
export class GlobalHelper {   

    static s3 = new AWS.S3({
        accessKeyId: getEnvironmentVariable().access_key, //will be put in .env
        secretAccessKey: getEnvironmentVariable().secret_key //will be put in .env
    });
    

    //generate four digits unique otp
    static generateOtp(size: number = 4) {
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
        };
    }

    //upload images or files in S3 bucket
    static uploadInS3(image, path = 'profile_pictures') {
        //let path:any= 'profile_pictures';
        console.log('upload s3 image called......');
        const imageRemoteName = `${path}/image_${new Date().getTime()}.png`;
        console.log('inside s3')
        return GlobalHelper.s3.putObject({
            Bucket: getEnvironmentVariable().bucket_name,
            Body: fs.readFileSync(image.filepath),
            ContentType: image.mimetype,
            Key: imageRemoteName,
            ACL: 'public-read'
        })
            .promise()
            .then(async response => {
                console.log('image remote name', imageRemoteName);
                return imageRemoteName;
            })
            .catch(err => {
                console.log('failed:', err)
                return false;
            })
    }

    //delete files from S3 bucket
    static deleteFromS3(path) {
        return GlobalHelper.s3.deleteObject({
            Bucket: getEnvironmentVariable().bucket_name,
            Key: path
        }, function (err, data) {
            console.log(data);
        })
    }

}