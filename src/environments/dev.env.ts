import { Environment } from "./env";

export const DevEnvironment: any = {
    db_url: process.env.DB_URL,    
    access_key:process.env.ACCESS_KEY,
    secret_key:process.env.SECRET_KEY,
    bucket_name:process.env.BUCKET_NAME,
    jwt_key:process.env.JWT_KEY    
}