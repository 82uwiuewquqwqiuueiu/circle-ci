import _RL from '../services/ResponseService'
import * as Jwt from 'jsonwebtoken';
import User from '../models/User';
import _RS from '../services/ResponseService';

export class AuthMiddleWare {  
    static token;
    static authenticate(req, res, next) {

        AuthMiddleWare.token = req.headers.authorization;        
        if (!AuthMiddleWare.token)
            return _RL.unauthorized(res, 'Invalid token. Please try login again.', {});
        AuthMiddleWare.token = AuthMiddleWare.token.replace(/^Bearer\s+/, "");
        Jwt.verify(AuthMiddleWare.token, process.env.JWT_KEY, (err, decoded) => {
            if (err) {
                console.log(err);
                return _RL.unauthorized(res, 'Failed to authenticate user.', {});
            }            
            req.data = decoded;
            console.log('decoded is', req.data);
            next();
        });
    };

    static async checkUser(req,res,next){
        let user=await User.findOne({
            $or:[
                { email:req.body.email,account_status:{$ne:'PENDING'}},
                { country_code:req.body.country_code,phone_number:req.body.phone_number,account_status:{$ne:'PENDING'}}
            ]
        });
        console.log(user);
        if(user && user.email==req.body.email.toLowerCase ){
            return _RS.existConflict(res,'Email already exists',{});
        }
        else if(user && user.phone_number==req.body.phone_number){
            return _RS.existConflict(res,'Phone number already exists.',{});
        }
        else
            next();
    }
}