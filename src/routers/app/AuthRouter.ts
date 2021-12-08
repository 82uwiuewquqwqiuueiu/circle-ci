import { Router } from "express";
import { AuthController } from "../../controllers/app/AuthController";
import { UserController } from "../../controllers/app/UserController";
import { GlobalMiddleWare } from "../../middleware/GlobalMiddleWare";
import { AuthMiddleWare } from "../../middleware/AuthMiddleware";
export class AuthRouter {
    public router: Router;
    constructor() {
        this.router = Router();
        this.getRoutes();
        this.postRoutes();
        this.patchRoutes();
        this.deleteRoutes();
        this.putRoutes();
    }
    getRoutes() {
        
    }

    postRoutes() {
        this.router.post('/signup',AuthMiddleWare.checkUser,AuthController.signUp)
        this.router.post('/verify-otp',AuthMiddleWare.checkUser,AuthController.verifyOtp)     
        this.router.post('/phone-login',AuthController.phoneLogin)
        this.router.post('/email-login',AuthController.emailLogin)    
        this.router.post('/reset-password',AuthController.resetPassword)  
        this.router.post('/resend-otp',AuthController.resendOtp)        
    }

    patchRoutes() {
    }

    putRoutes() {
        
    }
    deleteRoutes() {
    }
}
export default new AuthRouter().router;