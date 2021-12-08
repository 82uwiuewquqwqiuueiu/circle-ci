import * as AWS from 'aws-sdk';
export declare class GlobalHelper {
    static s3: AWS.S3;
    static generateOtp(size?: number): number;
    static generateJwtToken(userObject: any): string;
    static uploadInS3(image: any, path?: string): Promise<string | boolean>;
    static deleteFromS3(path: any): AWS.Request<AWS.S3.DeleteObjectOutput, AWS.AWSError>;
}
